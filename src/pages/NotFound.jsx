import { motion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Sticker from '../components/ui/Sticker.jsx'
import Tape from '../components/ui/Tape.jsx'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className="container">
        <div className={styles.card}>
          <Tape rotate={-4} className={styles.tape} />
          <motion.div
            initial={{ scale: 0.8, rotate: -15 }}
            animate={{ scale: 1, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={styles.stickerWrap}
          >
            <Sticker rotate={-5} color="yellow">404 ERROR</Sticker>
          </motion.div>

          <h1 className={styles.title}>PAGE NOT FOUND</h1>
          <p className={styles.text}>
            The requested route does not exist. It may have been removed, renamed, or is temporarily unavailable.
          </p>
          <span className={`${styles.scribble} handwritten`}>* Status 404: Resource not found.</span>

          <div className={styles.actions}>
            <Button to="/" variant="primary">GO BACK HOME</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
