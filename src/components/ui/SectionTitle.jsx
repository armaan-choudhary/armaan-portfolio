import { motion } from 'framer-motion'
import styles from './ui.module.css'

export default function SectionTitle({ children, rotate = 0, as: Tag = 'h2', className = '', annotation }) {
  return (
    <div className={styles.sectionTitleWrap} style={{ '--rotate': `${rotate}deg` }}>
      <Tag className={`${styles.sectionTitle} ${className}`}>{children}</Tag>
      {annotation && <span className={styles.sectionAnnotation}>{annotation}</span>}
    </div>
  )
}
