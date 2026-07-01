import { motion } from 'framer-motion'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.tornEdgeTop}>
        <svg viewBox="0 0 1200 50" preserveAspectRatio="none">
          <path d="M0,50 L0,20 Q150,50 300,10 T450,20 Q600,0 750,25 T1050,15 L1200,30 L1200,50 Z" fill="var(--black)" />
        </svg>
      </div>

      <div className="tape" style={{top: -15, left: '20%', transform: 'rotate(-2deg)', zIndex: 10}}></div>
      <div className="tape" style={{top: -15, right: '20%', transform: 'rotate(2deg)', zIndex: 10}}></div>
      
      <div className={`container ${styles.bottomInner}`}>
        <div className={styles.footerContent}>
          
          <div className={styles.libraryStamp}>
            <div className={styles.stampBorder}>
              <span style={{fontSize: '0.8rem', letterSpacing: '1px'}}>LIBRARY OF ARMAAN</span>
              <span style={{fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0'}}>DUE DATE</span>
              <span style={{color: 'var(--red-marker)', fontFamily: 'var(--font-handwritten)', fontSize: '1.4rem'}}>Always.</span>
            </div>
          </div>

          <div className={styles.signatureBlock}>
            <span style={{fontFamily: 'var(--font-body)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5}}>Signed by</span>
            <span className={styles.signature}>Armaan Choudhary</span>
          </div>

        </div>

        <div className={styles.socialsAndCopy}>
          <div className={styles.socials}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GH</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>IN</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>X</a>
          </div>
          <span className={styles.copy}>© {new Date().getFullYear()} — Built with grit.</span>
        </div>
      </div>
    </footer>
  )
}
