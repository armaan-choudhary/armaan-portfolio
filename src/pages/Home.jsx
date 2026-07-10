import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import styles from './Home.module.css';
import { ArrowDownRight, Wrench, Hammer, Drill, Ruler, CheckCircle } from 'lucide-react';
import { FaReact, FaWordpress, FaPhp, FaDatabase, FaNodeJs, FaFigma, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaExchangeAlt } from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiFramer, 
  SiVite, 
  SiGreensock, 
  SiWebpack, 
  SiVercel 
} from 'react-icons/si';

const renderSkillIcon = (name) => {
  const norm = name.toLowerCase();
  const inkColor = "#222222"; // Uniform black newspaper print ink
  if (norm.includes('react')) return <FaReact size={68} color={inkColor} />;
  if (norm.includes('javascript')) return <SiJavascript size={68} color={inkColor} />;
  if (norm.includes('typescript')) return <SiTypescript size={68} color={inkColor} />;
  if (norm.includes('framer motion')) return <SiFramer size={68} color={inkColor} />;
  if (norm.includes('html5/css3')) return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
      <FaHtml5 size={46} color={inkColor} />
      <FaCss3Alt size={46} color={inkColor} />
    </div>
  );
  if (norm.includes('vite')) return <SiVite size={68} color={inkColor} />;
  if (norm.includes('gsap')) {
    return (
      <svg viewBox="20 20 360 260" width={68} height={68} style={{ display: 'block' }}>
        <path fill={inkColor} d="M118.16,216.86c1.31,0,2.45-.83,2.7-1.97l4.63-20.09v-.06h0c.02-1.17-.79-2.25-1.95-2.39-.1-.02-.21-.02-.31-.02h-44.49v.05c-1.15.14-2.08.92-2.31,1.95l-4.64,20.13c-.13.55.01,1.11.38,1.56.43.54,1.16.87,1.88.87h6.78c.39,0,.91.06,1.09.3.18.23.16.76-.02,1.43-1.32,4.84-4.45,10.14-8.35,13.2s-10.33,4.9-14.84,2.13c-5.09-3.12-5.95-10.65-6.16-16.01-.44-11.51,1.81-23.06,6.23-33.7,3.17-7.62,9.14-21.36,19.26-21.36,5.74,0,8.63,4.74,8.84,14.47-.01.92.82,1.77,1.76,1.77h26.4c1.28,0,2.34-1.03,2.36-2.31-.01-14.07-3.23-24.83-9.56-31.96-5.99-6.75-14.59-10.13-25.55-10.03-36.04,0-54.75,36.41-58.71,72.49-2.2,19.22,1.43,35.17,10.21,44.91,6.64,7.37,14.47,11.11,26.09,11.11,12.92,0,22.6-2.87,30.45-9.02,9.23-7.22,16.21-19.25,21.37-36.76.11-.4.49-.67.9-.67h5.59l-.03-.02Z"/>
        <path fill={inkColor} d="M169.62,189.84c-9.67-9.38-13.07-14.84-12.96-20.85.09-5.39,3.33-8.47,8.36-8.47s7.48,3.45,7.48,10.55c0,1.57,1.33,2.87,2.93,2.87h24.32c1.28,0,2.34-1.03,2.36-2.29h0c.3-11.66-2.4-20.78-8.02-27.09-5.93-6.66-15.01-10.08-27-10.16-11.97,0-22.28,3.74-29.81,10.81-7.13,6.69-11.15,15.96-11.33,26.08-.31,17.47,9.56,28.57,20.56,39.33,8.52,8.76,10.08,13.1,10,18.04-.1,5.72-2.83,9-7.47,9-1.92,0-3.45-.59-4.56-1.77-1.72-1.81-2.48-5.08-2.2-9.45.1-.57-.06-1.17-.46-1.65-.46-.57-1.13-.9-1.82-.9h-25.15c-1.28,0-2.33,1.02-2.36,2.28-.59,12.13,2.23,21.53,8.4,27.93,6.07,6.31,15.2,9.5,27.16,9.5,23.4,0,38.79-14.62,39.19-37.25.24-13.99-4.86-24.57-17.6-36.52h-.02Z"/>
        <path fill={inkColor} d="M275.35,136.75h-37.64c-1.26,0-1.82,1.09-2.18,1.81l-54.49,120.06v.02s0,.02-.02.03c-.61,1.48.54,3.06,2.14,3.06h26.31c1.42,0,2.36-.43,2.83-1.33l5.22-12.55c.64-1.67.76-1.83,2.59-1.83h25.14c1.75,0,1.78.04,1.76,1.74l-.56,11.67c-.02,1.26,1,2.29,2.28,2.29h26.58c.68,0,1.31-.28,1.73-.78.38-.44.54-1.01.45-1.59l.16-120.31c.02-1.26-1-2.29-2.28-2.29h-.02ZM248.05,217.37c-.18,1.78-.26,1.85-2.01,2l-15.11-.18h-.04,0c-.24,0-.43,0-.59-.03-.39-.04-.66-.41-.56-.79.05-.18.12-.41.23-.7l18.85-46.64c.16-.46.37-.91.58-1.35.31-.63.68-.67.79-.2.1.39-2.16,47.89-2.16,47.89h0Z"/>
        <path fill={inkColor} d="M331.11,136.73h-20c-1.06,0-2.24.57-2.52,1.82,0,0-27.8,120.71-27.8,120.72-.12.56,0,1.11.38,1.57.44.54,1.16.87,1.88.87h24.97c1.34,0,2.26-.66,2.51-1.8,0,0,3.03-13.64,3.03-13.68.21-1.07-.16-1.89-1.11-2.39-.45-.23-.9-.47-1.34-.7l-4.33-2.25-4.31-2.25c-.56-.29-1.11-.58-1.66-.87-.28-.14-.45-.42-.44-.73,0-.46.39-.83.86-.83l13.68.06c4.1.02,8.19-.27,12.22-1.01,28.34-5.23,47.16-27.93,47.7-58.82.46-26.36-14.25-39.72-43.72-39.72h0ZM324.29,208.59h-.53c-1.2,0-1.41-.13-1.45-.18-.02-.03,7.89-34.77,7.9-34.82.2-1,.19-1.58-.43-1.92-.79-.44-12.34-6.53-12.34-6.53-.28-.15-.44-.43-.44-.74,0-.45.39-.83.85-.83h18.27c5.69.18,8.85,5.26,8.7,13.94-.26,15.04-7.41,30.54-20.53,31.07h0Z"/>
      </svg>
    );
  }
  if (norm.includes('swup')) return <FaExchangeAlt size={62} color={inkColor} />;
  if (norm.includes('wordpress')) return <FaWordpress size={68} color={inkColor} />;
  if (norm.includes('php')) return <FaPhp size={72} color={inkColor} />;
  if (norm.includes('sql')) return <FaDatabase size={62} color={inkColor} />;
  if (norm.includes('node')) return <FaNodeJs size={68} color={inkColor} />;
  if (norm.includes('figma')) return <FaFigma size={64} color={inkColor} />;
  if (norm.includes('git')) return <FaGitAlt size={68} color={inkColor} />;
  if (norm.includes('webpack')) return <SiWebpack size={68} color={inkColor} />;
  if (norm.includes('vercel')) return <SiVercel size={62} color={inkColor} />;
  return <FaDatabase size={62} color={inkColor} />;
};

export default function Home() {
  const navigate = useNavigate();
  const deskRef = useRef(null);
  const notebookRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({ name: '', email: '', message: '', _honeypot: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);

  const flyerX = useMotionValue(0);
  const flyerRotate = useTransform(flyerX, [-150, 150], [-12, 12]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'What should I call you?';
    if (!formData.email.trim()) {
      newErrors.email = 'Where can I reply?';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'That email looks a bit odd';
    }
    if (!formData.message.trim()) newErrors.message = 'Leave a word or two!';
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData._honeypot) {
      setFormSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', _honeypot: '' });
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setFormSubmitStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', _honeypot: '' });
    } catch (err) {
      setFormSubmitStatus('error');
    }
  };

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 80;
    const y = (e.clientY / window.innerHeight - 0.5) * 80;
    setMousePos({ x, y });
  };

  return (
    <div className={styles.home}>
      <section 
        className={styles.heroSection} 
        ref={deskRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      >
        <div 
          className={styles.heroWatermark}
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
        >
          ARMAAN
        </div>
        <div className={styles.heroGrid}>
          <motion.div 
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
          >
            <h1 className={styles.heroTitle}>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 50, rotate: -5 },
                  visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 12 } }
                }}
              >
                CRAFTING
              </motion.span>
              <motion.span 
                className={styles.highlightText}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, rotate: 5 },
                  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 15 } }
                }}
              >
                DIGITAL
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: -50, rotate: 3 },
                  visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 12 } }
                }}
              >
                EXPERIENCES
              </motion.span>
            </h1>
            <motion.p 
              className={styles.heroSub}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
              }}
            >
              Freelance creative developer building fast, engaging, and production-ready web experiences.
            </motion.p>

            <motion.div 
              className={styles.ctaGroup}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
              }}
            >
              <a href="mailto:armaan3826@gmail.com" className={styles.btnPrimary}>
                <span>HIRE ME</span> — Let's Talk
              </a>
              <a href="#work" className={styles.btnSecondary}>
                View Projects
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.scrollArrow}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <svg viewBox="0 0 100 200" width="40" height="80">
             <path d="M50,0 Q60,100 50,180 M20,150 Q50,185 50,185 Q50,185 80,140" fill="none" stroke="var(--white)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </section>

      <section className={styles.projectsSection} id="work">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The Project Board</h2>
          <div className="tape" style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }}></div>
        </div>

        <div className={styles.boardGrid}>
          {projectsData.map((project, idx) => {
            const isFeatured = idx === 0;
            /* Unique subtle rotations per card */
            const rotations = [0, -1.5, 2, -1, 1.5, 1, -2];
            const rot = rotations[idx] || 0;
            /* Tape angle variety */
            const tapeAngles = [2, -3, 4, -2, 3, -4, 2];
            const tapeRot = tapeAngles[idx] || 0;
            /* Tape position variety */
            const tapePositions = ['50%', '30%', '70%', '50%', '40%', '60%', '50%'];
            const tapeLeft = tapePositions[idx] || '50%';
            /* Decoration: 0=clip, 1=folded, 2=stamp, 3=worn, 4=clip, 5=folded, 6=worn */
            const decoType = idx % 4;
            /* Reference numbers */
            const refNums = ['FW-001', 'QT-002', 'ZO-003', 'NT-004', 'CG-005', 'EL-006', 'PT-007', 'GL-008'];
            const refCode = refNums[idx] || (project.title.substring(0, 2).toUpperCase() + '-' + String(idx + 1).padStart(3, '0'));

            return (
              <motion.div 
                key={project.slug} 
                className={`${styles.curatedPolaroid} ${isFeatured ? styles.featuredPolaroid : ''} ${!isFeatured && decoType === 1 ? styles.foldedCorner : ''} ${!isFeatured && decoType === 3 ? styles.wornEdge : ''}`}
                initial={{ opacity: 0, scale: 0.85, rotate: rot - 10, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rot, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 220, damping: 16 }}
                onClick={() => navigate(`/work/${project.slug}`)}
                style={{ marginTop: !isFeatured ? `${((idx - 1) % 3) * 60}px` : '0px' }}
              >
                {/* Masking tape strips — corner mounts */}
                <div className="tape" style={{ top: -12, left: 10, transform: `rotate(${tapeRot - 35}deg)`, width: '80px' }}></div>
                <div className="tape" style={{ top: -12, right: 10, transform: `rotate(${-tapeRot + 35}deg)`, width: '80px' }}></div>
                
                {/* Decorations — unique per card */}
                {!isFeatured && decoType === 0 && <div className={styles.paperClip} style={{top: -20, right: 20, transform: 'rotate(10deg)'}}></div>}
                {!isFeatured && decoType === 2 && <div className={styles.stamp} style={{bottom: 50, right: 15, transform: 'rotate(-12deg)'}}>APPROVED</div>}
                {isFeatured && <div className={styles.stamp} style={{top: -15, right: 30, transform: 'rotate(6deg)', borderColor: 'var(--blue-ink)', color: 'var(--blue-ink)'}}>FEATURED</div>}
                
                {/* Reference number — tiny pencil note */}
                {!isFeatured && (
                  <span className="handwritten" style={{position: 'absolute', bottom: 12, left: 15, fontSize: '0.9rem', color: '#aaa', opacity: 0.7}}>
                    Ref: {refCode}
                  </span>
                )}
                
                {isFeatured ? (
                  <>
                    <div className={styles.featuredTitleRow}>
                      <h3 className={styles.featuredTitleCenter}>{project.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span className={styles.featuredCategoryText}>{project.category}</span>
                        <span className="handwritten" style={{ fontSize: '1.2rem', color: '#999' }}>— {project.year}</span>
                      </div>
                    </div>

                    <div className={styles.featuredPhotoContainer}>
                      <div className="tape" style={{ top: -15, left: '45%', transform: `translateX(-50%) rotate(3deg)` }}></div>
                      <img src={project.heroImage} alt={project.title} className={styles.polaroidImage} />
                      <span className="handwritten" style={{display: 'block', textAlign: 'center', marginTop: '6px', fontSize: '1rem', color: '#999'}}>
                        Homepage • Desktop
                      </span>
                    </div>

                    <div className={styles.polaroidContent}>
                      <p className={styles.featuredSummary}>
                        {project.overview || project.summary}
                      </p>

                      <div className={styles.polaroidTech}>
                        {project.techStack.map((tech) => (
                          <span key={tech} className={styles.featuredTech}>
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className={styles.featuredCTA} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <button className={styles.paperButton} onClick={(e) => { e.stopPropagation(); navigate(`/work/${project.slug}`); }}>
                          → OPEN CASE FILE
                        </button>
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.paperButton}
                            style={{ background: 'var(--yellow-highlighter)', textDecoration: 'none', display: 'inline-block' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.liveUrl.includes('github.com') ? '↗ VIEW ON GITHUB' : '↗ VISIT LIVE SITE'}
                          </a>
                        )}
                      </div>

                      <div className={styles.paperClip} style={{top: '35%', right: -15, transform: 'rotate(90deg)'}}></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.polaroidHeader} style={{ justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '12px' }}>
                      <h3 className={styles.polaroidTitle} style={{ margin: 0 }}>{project.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span className={styles.smallCategoryText}>{project.category}</span>
                        <span className="handwritten" style={{ fontSize: '1rem', color: '#999' }}>— {project.year}</span>
                      </div>
                    </div>

                    <div className={styles.smallPhotoContainer}>
                      <div className="tape" style={{ top: -12, left: '50%', transform: `translateX(-50%) rotate(${tapeRot}deg)` }}></div>
                      {project.heroImage ? (
                        <img src={project.heroImage} alt={project.title} className={styles.polaroidImage} />
                      ) : (
                        <div className={styles.polaroidPhotoInner}>
                          {project.title.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="handwritten" style={{ display: 'block', textAlign: 'center', marginTop: '4px', fontSize: '0.85rem', color: '#999' }}>
                        Preview • {project.year}
                      </span>
                    </div>

                    <div className={styles.polaroidContent}>
                      <p className={styles.smallSummary}>{project.summary}</p>
                      <div className={styles.polaroidTech}>
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className={styles.featuredTech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className={styles.cardCTA}>
                        <button className={styles.paperButton} style={{ fontSize: '0.85rem', padding: '6px 14px' }} onClick={(e) => { e.stopPropagation(); navigate(`/work/${project.slug}`); }}>
                          → VIEW PROJECT
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className={styles.servicesSection} id="services">
        <motion.div 
          className={styles.dinerMenu}
          initial={{ opacity: 0, y: 50, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.02, rotate: -1, zIndex: 10 }}
        >
          {/* Tapes to hold it down */}
          <div className="tape" style={{ top: -10, left: '20%', transform: 'rotate(-5deg)' }}></div>
          <div className="tape" style={{ top: -10, right: '20%', transform: 'rotate(5deg)' }}></div>
          
          <div className={styles.coffeeStainMenu}></div>

          <div className={styles.menuHeader}>
            <h2 className={styles.menuTitle}>THE SERVICES MENU</h2>
            <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.6rem', color: 'var(--blue-ink)', margin: 0, transform: 'rotate(-2deg)' }}>Freshly coded, made to order.</p>
          </div>

          <div className={styles.menuGrid}>
            {/* Section 1 */}
            <div className={styles.menuCategory}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', paddingRight: '10px' }}>
                <h3 className={styles.categoryTitle} style={{ marginBottom: 0 }}>Appetizers</h3>
                <img src="/images/diner_coffee.jpg" alt="Coffee" className={styles.menuImage} />
              </div>
              
              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Wireframes & User Flows</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>MP</span>
              </div>
              <p className={styles.menuItemDesc}>Structural layouts and journey mapping to ensure intuitive navigation.</p>

              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Figma Prototypes</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$$</span>
              </div>
              <p className={styles.menuItemDesc}>High-fidelity, interactive mockups that look and feel like the real thing.</p>
              
              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Design Systems</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$$$</span>
              </div>
              <p className={styles.menuItemDesc}>Reusable component libraries built for consistency and scalable branding.</p>

              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Brand Identity</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$$</span>
              </div>
              <p className={styles.menuItemDesc}>Color palettes, typography, and logos crafted for modern digital spaces.</p>
            </div>

            {/* Section 2 */}
            <div className={styles.menuCategory}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', paddingRight: '10px' }}>
                <h3 className={styles.categoryTitle} style={{ marginBottom: 0 }}>Main Courses</h3>
                <img src="/images/diner_burger.jpg" alt="Burger" className={styles.menuImage} style={{ transform: 'rotate(-4deg)' }} />
              </div>
              
              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>React & Vue Web Apps</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$$$</span>
              </div>
              <p className={styles.menuItemDesc}>Fast, responsive, and dynamic Single Page Applications built for scale.</p>

              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Full-Stack Architecture</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$$$$</span>
              </div>
              <p className={styles.menuItemDesc}>End-to-end development utilizing Node.js, Python, and Supabase/PostgreSQL.</p>
              
              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>API & Integrations</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$$</span>
              </div>
              <p className={styles.menuItemDesc}>Seamlessly connecting third-party services, RESTful APIs, and WebSockets.</p>

              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>E-Commerce Setup</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$$$</span>
              </div>
              <p className={styles.menuItemDesc}>Custom storefronts and secure Stripe/PayPal payment gateway integrations.</p>
            </div>

            {/* Section 3 */}
            <div className={styles.menuCategory}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', paddingRight: '10px' }}>
                <h3 className={styles.categoryTitle} style={{ marginBottom: 0 }}>Desserts</h3>
                <img src="/images/diner_pie.jpg" alt="Pie" className={styles.menuImage} style={{ transform: 'rotate(8deg)' }} />
              </div>
              
              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Advanced Animations</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$$</span>
              </div>
              <p className={styles.menuItemDesc}>Buttery-smooth spring physics and timeline animations using GSAP & Framer Motion.</p>

              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Performance Tuning</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>SWEET</span>
              </div>
              <p className={styles.menuItemDesc}>Bundle optimization, lazy loading, and chasing 100/100 Lighthouse scores.</p>
              
              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Technical SEO</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$</span>
              </div>
              <p className={styles.menuItemDesc}>Semantic HTML, metadata generation, and sitemap structuring for search engines.</p>

              <div className={styles.menuItemRow}>
                <span className={styles.menuItemName}>Accessibility (a11y)</span>
                <div className={styles.menuDottedLine}></div>
                <span className={styles.menuPrice}>$</span>
              </div>
              <p className={styles.menuItemDesc}>Ensuring your application is usable and welcoming to all screen readers and users.</p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px', borderTop: '2px dashed var(--black)' }}>
            <h4 className="marker" style={{ fontSize: '1.5rem', color: 'var(--red-marker)' }}>CHEF'S SPECIAL</h4>
            <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.4rem', color: 'var(--blue-ink)' }}>Ask about custom AI & Machine Learning integrations for your backend!</p>
          </div>

        </motion.div>
      </section>

      <section className={styles.aboutSection} id="about">
        <div className="container">
          <div className={styles.aboutGrid}>
            {/* LEFT COLUMN: Profile Cluster */}
            <motion.div 
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '50px' }}
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', alignItems: 'center' }}>
                {/* Coffee Stain Doodle */}
                <div className={styles.coffeeStain} style={{ top: '-20px', left: '-20px', zIndex: 0 }}></div>

                {/* Top Row: Headshot */}
                <motion.div 
                  className={styles.aboutPhoto}
                  style={{ zIndex: 1, transform: 'rotate(-2deg)', width: '90%', maxWidth: '400px' }}
                  whileHover={{ rotate: -1, scale: 1.02, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="tape" style={{ top: -15, left: -10, transform: 'rotate(-45deg)' }}></div>
                  <div className="tape" style={{ top: -15, right: -10, transform: 'rotate(45deg)' }}></div>
                  <div style={{ width: '100%', height: '350px', border: '2px solid #000', backgroundColor: '#e6ded3', backgroundImage: 'url(/images/indian_bg_subtle.jpg)', backgroundSize: '800px', backgroundPosition: 'center', overflow: 'hidden' }}>
                    <img src="/images/headshot.png" alt="Armaan headshot" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', filter: 'grayscale(100%) contrast(110%)' }} />
                  </div>
                  <span className="polaroid-caption" style={{bottom: 20}}>Armaan.jpg</span>
                </motion.div>

                {/* Bottom Row */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
                  {/* Bottom Row Left: Sticky Note */}
                  <motion.div 
                    className={`sticky-note ${styles.stickyNoteAbout}`}
                    style={{ position: 'relative', top: '0', left: '0', right: 'auto', bottom: 'auto', width: '250px', height: 'max-content', transform: 'rotate(-4deg)', zIndex: 20, padding: '20px', fontSize: '1.5rem', marginRight: '-40px' }}
                    whileHover={{ scale: 1.05, rotate: -2, zIndex: 30 }}
                    drag
                    dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                  >
                    <div className="tape" style={{ top: -10, left: '50%', transform: 'translateX(-50%)', width: '60px' }}></div>
                    <strong className="marker" style={{fontSize: '1.4rem'}}>NOTE TO SELF:</strong><br/>
                    "Works on my machine" is a valid deployment strategy. Just ship the machine.
                  </motion.div>

                  {/* Bottom Row Right: Vintage Camera Polaroid */}
                  <motion.div 
                    className={styles.aboutPhoto}
                    style={{ position: 'relative', width: '220px', transform: 'rotate(5deg)', zIndex: 2, marginLeft: '-20px', marginTop: '20px' }}
                    whileHover={{ rotate: 7, scale: 1.05, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="tape" style={{ top: -10, right: 10, transform: 'rotate(10deg)' }}></div>
                    <div style={{ width: '100%', height: '200px', border: '2px solid #000', backgroundColor: '#e6ded3', overflow: 'hidden' }}>
                      <img src="/images/cool-photo.jpeg" alt="Vintage Camera" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span className="polaroid-caption" style={{bottom: 10, fontSize: '0.9rem'}}>S1060.jpg</span>
                  </motion.div>
                </div>
              </div>

              {/* Status Block */}
              <div className={styles.factGrid} style={{ marginTop: 'auto', zIndex: 5, backgroundColor: 'var(--paper-bg)', padding: '20px', border: '2px solid var(--black)', boxShadow: '4px 4px 0 var(--black)' }}>
                <div className={styles.factItem}>
                  <div className="marker" style={{color: 'var(--blue-ink)', fontSize: '1.2rem'}}>CURRENT STATUS</div>
                  <div style={{fontFamily: 'var(--font-heading)', fontSize: '1.3rem'}}>CS STUDENT & FREELANCER</div>
                </div>
                <div className={styles.factItem}>
                  <div className="marker" style={{color: 'var(--blue-ink)', fontSize: '1.2rem'}}>CORE STRENGTH</div>
                  <div style={{fontFamily: 'var(--font-heading)', fontSize: '1.3rem'}}>CREATIVE ENGINEERING</div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Text */}
            <motion.div 
              className={styles.aboutTextWrapper}
              initial={{ opacity: 0, x: 50, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              <div className={styles.notebookPage} ref={notebookRef} style={{ position: 'relative' }}>
                <div className={styles.notebookHeader}>
                  <h2 className="marker" style={{ fontSize: '3.5rem', transform: 'rotate(-2deg)' }}>ABOUT ME</h2>
                  <span className={styles.dateStampSmall}>Last updated: JUL 2026</span>
                </div>

                <div className={styles.notebookContent}>
                  <p style={{fontFamily: 'var(--font-handwritten)', fontSize: '1.8rem', lineHeight: '1.4', marginBottom: '20px'}}>
                    I'm <strong>Armaan</strong>, a <span className="highlight">creative developer</span> bridging the gap between <span className="marker" style={{color: 'var(--blue-ink)'}}>tactile design</span> and <span className="marker" style={{color: 'var(--red-marker)'}}>rigorous engineering</span>. I turn ideas into fast, interactive websites where thoughtful architecture meets immersive UI.
                  </p>
                  
                  <p style={{fontFamily: 'var(--font-handwritten)', fontSize: '1.8rem', lineHeight: '1.4', marginBottom: '20px'}}>
                    Every project is an opportunity to build something meaningful that performs flawlessly. I treat web development with the same precision I apply to my computer science coursework—focusing on <span className="highlight">raw performance</span>, <span className="highlight">minimal dependencies</span>, and scalable logic.
                  </p>

                  <p style={{fontFamily: 'var(--font-handwritten)', fontSize: '1.8rem', lineHeight: '1.4', marginBottom: '40px'}}>
                    Based in the <span className="marker" style={{color: 'var(--blue-ink)'}}>Delhi NCR</span>, my curiosity extends far beyond the browser. When I'm offline, you'll find me optimizing <span className="highlight">minimal Linux environments</span>, writing bare-metal C++ algorithms, or hunting for <span className="marker" style={{color: 'var(--red-marker)'}}>vintage digital cameras</span> in local markets.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.skillsSection} id="skills">
        <div className={styles.broadsheetContainer}>
          {/* Skeuomorphic corner anchors */}
          <div className={styles.broadsheetStapleL} />
          <div className={styles.broadsheetStapleR} />
          
          <div className={styles.broadsheetPaper}>
            {/* Front Page Broadsheet Header */}
            <div className={styles.broadsheetHeader}>
              <div className={styles.headerTopMeta}>
                <span>VOL. CLXV // NO. 482</span>
                <span className="handwritten">"All the Tech That's Fit to Code"</span>
                <span>PRICE: ZERO CENTS</span>
              </div>
              <h2 className={styles.broadsheetTitle}>THE SKILL BILL BULLETIN</h2>
              <div className={styles.headerBottomMeta}>
                <span>METROPOLIS EDITION</span>
                <span>JULY 8, 2026</span>
                <span>CLASSIFIED TECH STACK</span>
              </div>
            </div>

            {/* Articles Grid (Broadsheet columns) */}
            <div className={styles.broadsheetGrid}>
              {[
                { name: "React 19", level: "UI STACK LAUNCHED", desc: "React designated as primary frontend stack for modular UI components." },
                { name: "Python", level: "DATA LOGIC CONFIRMED", desc: "Python handles deep learning and robust API backend processing." },
                { name: "PyTorch", level: "NEURAL NETS DEPLOYED", desc: "Unstructured pruning and model architecture engineered locally." },
                { name: "TensorRT", level: "INFERENCE MAXIMIZED", desc: "C++ hardware engines shatter edge appliance latency ceilings." },
                { name: "FastAPI", level: "SERVER SPEEDS SOAR", desc: "Asynchronous endpoints built to handle heavy frontend requests." },
                { name: "Supabase", level: "REALTIME DB SYNCED", desc: "PostgreSQL databases connected via high-speed WebSockets." },
                { name: "Tailwind CSS", level: "STYLING SYSTEM ADOPTED", desc: "Utility classes streamline dynamic and responsive interface designs." },
                { name: "Framer Motion", level: "FLUID INTERACTION ALIVE", desc: "Spring animations bring interface elements to life smoothly." },
                { name: "GSAP 3", level: "COMPLEX TIMELINES SYNCED", desc: "Vector graphics animate across multi-stage timelines seamlessly." },
                { name: "FAISS", level: "VECTOR SEARCH LIVE", desc: "High-accuracy retrieval pipelines deployed for semantic querying." },
                { name: "Google Gemini", level: "AI GENERATION ONLINE", desc: "LLMs integrated directly to process dense PDF and text data." },
                { name: "Vite", level: "COMPILATION SPEEDS MAX", desc: "Fast dev server accelerates HMR cycles and production builds." },
                { name: "PHP", level: "OOP ARCHITECTURE", desc: "Clean object-oriented scripts process secure server operations." },
                { name: "SQL", level: "QUERIES OPTIMIZED", desc: "Relational database tables hold portfolio data under strict constraints." },
                { name: "WordPress", level: "THEMING MASTERED", desc: "Custom dynamic systems engineered specifically for client needs." },
                { name: "JavaScript", level: "VANILLA LOGIC INTACT", desc: "Core ES6+ scripts handle logic bypassing heavy frameworks." },
                { name: "Sentence Transformers", level: "EMBEDDINGS GENERATED", desc: "Local models map text for high-dimensional semantic clustering." },
                { name: "INT8 Quantization", level: "WEIGHTS COMPRESSED", desc: "Model weights squeezed mathematically for tight memory footprints." },
                { name: "Llama.cpp", level: "LLM INFERENCE OPTIMIZED", desc: "Local language models compiled natively for raw edge speed." },
                { name: "REST API", level: "ENDPOINTS ESTABLISHED", desc: "Stateless protocols engineered to bridge pipelines to clients." },
                { name: "Edge AI Inference", level: "HARDWARE OPTIMIZED", desc: "Heavy ML models aggressively compressed to run at high FPS on constrained devices." },
                { name: "Lenis Scroll", level: "SMOOTH SCROLLING", desc: "Native scrolling hijacked for buttery smooth interpolation." },
                { name: "SCSS / PostCSS", level: "STYLESHEETS COMPILED", desc: "Advanced CSS logic and autoprefixing deployed for consistency." },
                { name: "PyPDF", level: "DOCUMENTS PARSED", desc: "Complex financial data reliably extracted from dense technical PDFs." }
              ].map((skill, idx) => {
                return (
                  <div key={skill.name} className={styles.broadsheetArticle}>
                    <div className={styles.articleHeader}>
                      <span className={styles.articleSectionNum}>SECTION {idx + 1}</span>
                      <h4 className={styles.articleHeadline}>{skill.name}: {skill.level}</h4>
                    </div>
                    <div className={styles.articleBody}>
                      <div className={styles.newspaperLogoBox}>
                        {renderSkillIcon(skill.name)}
                      </div>
                      <p className={styles.articleText}>{skill.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id="contact">
        <motion.div 
          className={styles.flyerPaper}
          style={{ x: flyerX, rotate: flyerRotate, transformOrigin: '50% 15px' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.pushPin} style={{ top: 15, left: '50%', transform: 'translateX(-50%)' }}></div>
          
          <div className={styles.flyerContent}>
            <h2 className={styles.contactTitle}>Hire Me</h2>
            <p className={styles.contactText}>
              Need a digital experience, an interactive web application, or a creative technical solution? Let's discuss your next project.
            </p>
            
            {formSubmitStatus === 'success' ? (
              <motion.div 
                className={styles.successState}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className={styles.successStamp}>TRANSMISSION SENT</div>
                <h3 className="handwritten" style={{ fontSize: '2.4rem', color: 'var(--blue-ink)', marginBottom: '10px', textTransform: 'none' }}>
                  Thanks for writing!
                </h3>
                <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.6rem', lineHeight: '1.4', color: 'var(--black)', margin: '0 0 20px 0' }}>
                  Your message has been delivered to my mailbox. I will search my desk and get back to you within 24 hours.
                </p>
                <button 
                  type="button" 
                  className={styles.flyerSubmit} 
                  style={{ marginTop: '10px' }}
                  onClick={() => setFormSubmitStatus(null)}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className={styles.flyerForm} onSubmit={handleFormSubmit}>
                {/* Honeypot */}
                <input
                  type="text"
                  name="_honeypot"
                  value={formData._honeypot}
                  onChange={handleFormChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />
                
                <div className={styles.formField}>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Name..." 
                    className={`${styles.flyerInput} ${formErrors.name ? styles.inputError : ''}`} 
                    value={formData.name}
                    onChange={handleFormChange}
                    disabled={formSubmitStatus === 'submitting'}
                  />
                  {formErrors.name && <span className={`${styles.errorText} handwritten`}>{formErrors.name}</span>}
                </div>

                <div className={styles.formField}>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email..." 
                    className={`${styles.flyerInput} ${formErrors.email ? styles.inputError : ''}`} 
                    value={formData.email}
                    onChange={handleFormChange}
                    disabled={formSubmitStatus === 'submitting'}
                  />
                  {formErrors.email && <span className={`${styles.errorText} handwritten`}>{formErrors.email}</span>}
                </div>

                <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                  <textarea 
                    name="message"
                    placeholder="Message..." 
                    rows="3" 
                    className={`${styles.flyerTextarea} ${formErrors.message ? styles.inputError : ''}`}
                    value={formData.message}
                    onChange={handleFormChange}
                    disabled={formSubmitStatus === 'submitting'}
                  ></textarea>
                  {formErrors.message && <span className={`${styles.errorText} handwritten`}>{formErrors.message}</span>}
                </div>

                <button type="submit" className={styles.flyerSubmit} disabled={formSubmitStatus === 'submitting'}>
                  {formSubmitStatus === 'submitting' ? 'SENDING...' : 'Send Message'}
                </button>

                {formSubmitStatus === 'error' && (
                  <span className={`${styles.errorText} handwritten`} style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                    * Delivery failed. Please try again or email me directly.
                  </span>
                )}
              </form>
            )}
          </div>

          <div className={styles.tearOffTabs}>
            <a href="mailto:armaan3826@gmail.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>Email</span>
            </a>
            <a href="https://github.com/armaan-choudhary" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/armaan-choudhary-816392315/" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
