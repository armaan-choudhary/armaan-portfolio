import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.css'

const navItems = [
  { to: '/#work', label: 'PROJECTS' },
  { to: '/Resume.pdf', label: 'RESUME', external: true },
  { to: 'https://github.com/armaan-choudhary', label: 'GITHUB', external: true },
  { to: '/#contact', label: 'CONTACT' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoText}>A/C</span>
        </a>

        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className={styles.navLink}
              {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className={styles.menuBtn}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className={`${styles.menuBar} ${open ? styles.menuBarOpen1 : ''}`} />
          <div className={`${styles.menuBar} ${open ? styles.menuBarOpen2 : ''}`} />
          <div className={`${styles.menuBar} ${open ? styles.menuBarOpen3 : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((item) => (
              <a
                key={item.to}
                href={item.to}
                className={styles.mobileLink}
                onClick={() => setOpen(false)}
                {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
