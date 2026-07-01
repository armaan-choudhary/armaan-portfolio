import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Tape from './Tape.jsx'
import styles from './Polaroid.module.css'

export default function Polaroid({ to, image, title, category, rotate = -2, tapeRotate = -4, index = 0 }) {
  return (
    <motion.div
      className={styles.polaroid}
      style={{ '--rotate': `${rotate}deg` }}
      initial={{ opacity: 0, y: 40, rotate: rotate - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.08 }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
    >
      <Link to={to} className={styles.link}>
        <div className={styles.tapeWrap}>
          <Tape rotate={tapeRotate} className={styles.tapePos} />
        </div>
        <div className={styles.imageFrame}>
          <div className={styles.imagePlaceholder}>
            {image ? (
              <img src={image} alt={title} loading="lazy" />
            ) : (
              <span className={styles.placeholderText}>{title}</span>
            )}
          </div>
        </div>
        <div className={styles.caption}>
          <span className={styles.title}>{title}</span>
          <span className={styles.category}>{category}</span>
        </div>
      </Link>
    </motion.div>
  )
}
