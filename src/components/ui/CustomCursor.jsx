import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import { Pencil, Hand } from 'lucide-react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const cursorTypeRef = useRef('default');
  
  // Motion values for the fast layer (pen/hand)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Velocity-based tilt for the pen
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);
  // When moving quickly, the pen leans back, up to 35 degrees!
  const tilt = useTransform(velocityX, [-2500, 2500], [35, -35]);
  
  // Spring configurations for the trailing ring
  const springConfig = { damping: 20, stiffness: 300, mass: 0.6 }; // slightly looser for a bigger ring
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target;
      let newType = 'default';
      
      if (target.closest('input') || target.closest('textarea')) {
        newType = 'text';
      } else if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('label')
      ) {
        newType = 'pointer';
      } else if (target.closest('.polaroid') || target.closest('[data-drag]')) {
        newType = 'grab';
      }

      if (cursorTypeRef.current !== newType) {
        cursorTypeRef.current = newType;
        setCursorType(newType);
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    // Hide default cursor site-wide while custom cursor is active
    document.body.classList.add('custom-cursor-active');
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY]);

  // Don't show custom cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  // Calculate dynamic properties for the pen based on state
  let penRotate = 90;
  let penX = -2;
  let penY = 2;
  let penScale = 1;

  if (cursorType === 'pointer') {
    penRotate = 65; // Tilt back when hovering buttons
    penX = -4;
    penY = -4;
    penScale = 1.1;
  } else if (cursorType === 'text') {
    penRotate = 0; // Stand straight up for writing
    penX = -14;
    penY = 14;
    penScale = 0.9;
  }

  // Apply click modifiers to the pen
  if (isMouseDown) {
    penRotate += 20; // Bend the pen down like a finger!
    penScale *= 0.85; // Press into the screen
  }

  // Hand modifiers
  const handScale = isMouseDown ? 0.85 : 1;
  const handRotate = isMouseDown ? -15 : 0;

  return (
    <>
      {/* The main fast icon (Pen or Hand) */}
      <motion.div 
        className={styles.cursorFast}
        style={{ 
          x: cursorX, 
          y: cursorY, 
          rotate: cursorType === 'default' ? tilt : 0 
        }}
      >
        {cursorType !== 'grab' ? (
          <motion.div
            className={styles.iconWrapper}
            animate={{ rotate: penRotate, x: penX, y: penY, scale: penScale }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <Pencil size={36} strokeWidth={2.5} className={`${styles.penIcon} ${isMouseDown ? styles.iconDown : ''}`} color="var(--black)" fill="var(--white)" />
          </motion.div>
        ) : (
          <motion.div
            className={styles.iconWrapper}
            animate={{ rotate: handRotate, scale: handScale, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <Hand size={36} strokeWidth={2.5} className={`${styles.handIcon} ${isMouseDown ? styles.iconDown : ''}`} color="var(--black)" fill="var(--white)" />
          </motion.div>
        )}
      </motion.div>
      
      {/* The trailing springy ring (Highlight, Box, etc.) */}
      <motion.div 
        className={`${styles.cursorRing} ${styles[cursorType] || ''} ${isMouseDown ? styles.ringDown : ''}`}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: isMouseDown ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
}
