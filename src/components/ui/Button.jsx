import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './ui.module.css'

export default function Button({ to, href, onClick, children, variant = 'primary', type = 'button', className = '' }) {
  const variantClass = variant === 'yellow' ? styles.btnYellow : styles.btnPrimary

  const content = (
    <motion.span
      whileHover={{ y: -3 }}
      whileTap={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${styles.btnInner} ${variantClass} ${className}`}
    >
      {children}
    </motion.span>
  )

  if (to) {
    return <Link to={to} className={styles.btnLink}>{content}</Link>
  }
  if (href) {
    return <a href={href} className={styles.btnLink} target="_blank" rel="noopener noreferrer">{content}</a>
  }
  return <button type={type} onClick={onClick} className={styles.btnLink}>{content}</button>
}
