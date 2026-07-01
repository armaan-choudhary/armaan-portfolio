import styles from './ui.module.css'

export default function Tape({ className = '', rotate = -4, style }) {
  return (
    <div
      className={`${styles.tape} ${className}`}
      style={{ '--rotate': `${rotate}deg`, ...style }}
    />
  )
}
