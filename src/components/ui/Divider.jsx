import styles from './ui.module.css'

export default function Divider({ variant = 'dashed', className = '' }) {
  if (variant === 'block') {
    return <div className={`${styles.dividerBlock} ${className}`} />
  }
  return <hr className={`${styles.dividerDashed} ${className}`} />
}
