import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const navItems = [
  { to: '/#work', label: 'PROJECTS' },
  { to: '/Resume.pdf', label: 'RESUME', external: true },
  { to: 'https://github.com/armaan-choudhary', label: 'GITHUB', external: true },
  { to: '/#contact', label: 'CONTACT' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const location = useLocation()

  const handleNavClick = (e, to, external) => {
    if (external) {
      setTimeout(() => setOpen(false), 150);
      return;
    }
    
    setOpen(false);
    
    // If we are already on the target page and just changing hash, smoothly scroll
    if (to.startsWith('/#') && location.pathname === '/') {
      const id = to.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        // We do NOT prevent default, we let React Router update the URL
        // but we can manually trigger the scroll instantly for better UX
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo} onClick={() => setTimeout(() => setOpen(false), 150)}>
          <span className={styles.logoText}>A/C</span>
        </a>

        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            item.external ? (
              <a
                key={item.to}
                href={item.to}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, item.to, true)}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, item.to, false)}
              >
                {item.label}
              </Link>
            )
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
              item.external ? (
                <a
                  key={item.to}
                  href={item.to}
                  className={styles.mobileLink}
                  onClick={(e) => handleNavClick(e, item.to, true)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={styles.mobileLink}
                  onClick={(e) => handleNavClick(e, item.to, false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
