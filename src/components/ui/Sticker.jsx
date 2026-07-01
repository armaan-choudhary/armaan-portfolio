import { motion } from 'framer-motion'
import styles from './ui.module.css'

export default function Sticker({ children, rotate = 0, color = 'yellow', className = '', delay = 0 }) {
  const colorClass =
    color === 'white' ? styles.stickerWhite :
    color === 'black' ? styles.stickerBlack :
    styles.stickerYellow

  return (
    <motion.div
      className={`${styles.sticker} ${colorClass} ${className}`}
      style={{ '--rotate': `${rotate}deg` }}
      initial={{ scale: 0, rotate: rotate - 20 }}
      whileInView={{ scale: 1, rotate }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay }}
      whileHover={{ scale: 1.08, rotate: rotate + 3 }}
    >
      {children}
    </motion.div>
  )
}
