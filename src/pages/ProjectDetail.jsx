import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from '../data/projects.json'
import styles from './ProjectDetail.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const projectIndex = projectsData.findIndex((p) => p.slug === slug)
  const project = projectsData[projectIndex]

  useEffect(() => {
    if (!project) {
      navigate('/#work', { replace: true })
    }
  }, [project, navigate])

  if (!project) return null

  const nextProject = projectsData[(projectIndex + 1) % projectsData.length]
  const [lightbox, setLightbox] = useState(null) // index of open screenshot
  const [[page, direction], setPage] = useState([0, 0]) // slide index & direction for animation

  const changeSlide = (newIndex, newDirection) => {
    setPage([newIndex, newDirection])
    setLightbox(newIndex)
  }

  const openLightbox = (index) => {
    setPage([index, 1])
    setLightbox(index)
  }

  // Close lightbox on Escape & navigate with Arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight' && project.screenshots) {
        const next = (lightbox + 1) % project.screenshots.length
        changeSlide(next, 1)
      }
      if (e.key === 'ArrowLeft' && project.screenshots) {
        const prev = (lightbox - 1 + project.screenshots.length) % project.screenshots.length
        changeSlide(prev, -1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, project.screenshots])

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotate: dir > 0 ? 6 : -6,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 22,
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      rotate: dir < 0 ? 6 : -6,
      scale: 0.9,
      transition: { duration: 0.25 },
    }),
  }

  return (
    <div className={styles.detailPage}>

      {/* ─── HERO ─── */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <a href="/#work" className={styles.backBtn}>← Back to Projects</a>

          <motion.h1
            className={styles.projectTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {project.title}
          </motion.h1>

          <div className={styles.metaRow}>
            <span className={styles.metaTag}>{project.category}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaTag}>{project.year}</span>
            {project.liveUrl && (
              <>
                <span className={styles.metaDivider}>•</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.paperButton}
                  style={{ background: 'var(--yellow-highlighter)', textDecoration: 'none', padding: '4px 12px', fontSize: '0.85rem' }}
                >
                  ↗ VISIT LIVE SITE
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── HERO IMAGE ─── */}
      <section className={styles.heroImageSection}>
        <motion.div
          className={styles.heroPhoto}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onClick={() => project.screenshots && openLightbox(0)}
          style={{ cursor: project.screenshots ? 'pointer' : 'default' }}
        >
          <div className="tape" style={{ top: -15, left: '40%', transform: 'translateX(-50%) rotate(3deg)' }}></div>
          <div className="tape" style={{ top: -15, right: '15%', transform: 'rotate(-2deg)', width: 80 }}></div>
          <div className={styles.heroImgWrap}>
            {project.heroImage ? (
              <img src={project.heroImage} alt={project.title} className={styles.heroImgTag} />
            ) : (
              <div className={styles.heroImgFallback}>{project.title.substring(0, 2)}</div>
            )}
          </div>
          <span className="handwritten" style={{ display: 'block', textAlign: 'center', marginTop: '8px', fontSize: '1.1rem', color: '#888' }}>
            Homepage • Desktop Build {project.screenshots ? '(Click to Inspect)' : ''}
          </span>
        </motion.div>
      </section>

      {/* ─── OVERVIEW + TECH ─── */}
      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>

          {/* Vision / Overview */}
          <motion.div
            className={styles.visionCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="tape" style={{ top: -15, left: '12%', transform: 'rotate(-3deg)' }}></div>
            <h2 className="marker" style={{ fontSize: '2.2rem', marginBottom: '15px' }}>The Vision</h2>
            <p>{project.vision || project.overview || project.summary}</p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className={styles.techCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.paperClipDeco}></div>
            <h2 className="marker" style={{ fontSize: '2.2rem', marginBottom: '15px' }}>Tech Stack</h2>
            <ul>
              {project.techStack.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className={styles.processSection}>
        <div className={styles.processCard}>
          <div className="tape" style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>
          <h2 className="marker" style={{ fontSize: '2.4rem', marginBottom: '25px', transform: 'rotate(-1deg)' }}>Architecture & Implementation</h2>
          <ol>
            {project.process.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {step}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── CHALLENGES ─── */}
      <section className={styles.challengesSection}>
        <h2 className={styles.sectionLabel}>Technical Challenges</h2>
        <div className={styles.challengesGrid}>
          {project.challenges.map((challenge, index) => (
            <motion.div
              key={index}
              className={styles.challengeCard}
              style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1.5}deg)` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -4, boxShadow: '4px 12px 25px rgba(0,0,0,0.12)' }}
            >
              <div className="tape" style={{ top: -12, left: index % 2 === 0 ? '20%' : '60%', transform: `rotate(${index % 2 === 0 ? 4 : -3}deg)`, width: 90 }}></div>
              <h3>{challenge.title}</h3>
              <div className={styles.challengeDivider}></div>
              <p>{challenge.solution}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className={styles.gallerySection}>
          <h2 className={styles.sectionLabel}>Project Gallery</h2>
          <div className={styles.galleryGrid}>
            {project.screenshots.map((src, index) => {
              const rots = [-1.5, 2, -1, 1.5, -2, 1, -0.5];
              const rot = rots[index % rots.length];
              return (
                <motion.div
                  key={index}
                  className={styles.galleryPolaroid}
                  style={{ rotate: rot }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6, rotate: 0, scale: 1.02, boxShadow: '4px 16px 32px rgba(0,0,0,0.18)' }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="tape" style={{ top: -12, left: '50%', transform: `translateX(-50%) rotate(${rot * -2}deg)`, width: 90 }}></div>
                  <div className={styles.polaroidImageWrap}>
                    <img src={src} alt={`${project.title} screenshot ${index + 1}`} />
                    <div className={styles.polaroidOverlayHint}>Inspect</div>
                  </div>
                  <span className="handwritten" style={{ display: 'block', textAlign: 'center', marginTop: '8px', fontSize: '1.15rem', color: 'var(--blue-ink)', width: '100%', letterSpacing: '1px' }}>
                    [EXHIBIT 0{index + 1}]
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── FUN SCRAPBOOK LIGHTBOX CAROUSEL ─── */}
      <AnimatePresence>
        {lightbox !== null && project.screenshots && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            {/* Header info bar */}
            <div className={styles.lightboxHeader} onClick={(e) => e.stopPropagation()}>
              <span className="handwritten" style={{ color: '#fff', fontSize: '1.3rem' }}>
                {project.title} Dossier — Slide {lightbox + 1} of {project.screenshots.length}
              </span>
              <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close">
                ✕ ESC
              </button>
            </div>

            {/* Nav Prev */}
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => {
                e.stopPropagation()
                const prev = (lightbox - 1 + project.screenshots.length) % project.screenshots.length
                changeSlide(prev, -1)
              }}
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Main Stage */}
            <div className={styles.lightboxStage} onClick={(e) => e.stopPropagation()}>
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={lightbox}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={styles.lightboxPhotoCard}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = offset.x
                    if (swipe < -50) {
                      const next = (lightbox + 1) % project.screenshots.length
                      changeSlide(next, 1)
                    } else if (swipe > 50) {
                      const prev = (lightbox - 1 + project.screenshots.length) % project.screenshots.length
                      changeSlide(prev, -1)
                    }
                  }}
                >
                  {/* Photo Corner Mounts */}
                  <div className={`${styles.cornerMount} ${styles.cornerTL}`} />
                  <div className={`${styles.cornerMount} ${styles.cornerTR}`} />
                  <div className={`${styles.cornerMount} ${styles.cornerBL}`} />
                  <div className={`${styles.cornerMount} ${styles.cornerBR}`} />

                  {/* Tape */}
                  <div className="tape" style={{ top: -15, left: '35%', transform: 'translateX(-50%) rotate(2deg)' }}></div>
                  <div className="tape" style={{ top: -15, right: '15%', transform: 'rotate(-3deg)', width: 80 }}></div>

                  {/* Image */}
                  <img src={project.screenshots[lightbox]} alt={`${project.title} screenshot ${lightbox + 1}`} />

                  {/* Caption & Metadata */}
                  <div className={styles.lightboxCaptionRow} style={{ justifyContent: 'center' }}>
                    <span className="handwritten" style={{ fontSize: '1.25rem', color: 'var(--blue-ink)', textAlign: 'center', width: '100%', display: 'block', letterSpacing: '1px' }}>
                      [EXHIBIT 0{lightbox + 1}]
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav Next */}
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={(e) => {
                e.stopPropagation()
                const next = (lightbox + 1) % project.screenshots.length
                changeSlide(next, 1)
              }}
              aria-label="Next image"
            >
              ›
            </button>

            {/* Bottom Filmstrip Carousel Tray */}
            <div className={styles.filmstripTray} onClick={(e) => e.stopPropagation()}>
              <span className="handwritten" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>
                ← Click slide or use Arrow Keys to navigate →
              </span>
              <div className={styles.filmstripRow}>
                {project.screenshots.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className={`${styles.filmstripThumb} ${idx === lightbox ? styles.filmstripActive : ''}`}
                    whileHover={{ scale: 1.1, rotate: (idx % 2 === 0 ? 3 : -3) }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => changeSlide(idx, idx > lightbox ? 1 : -1)}
                  >
                    <img src={src} alt={`Thumbnail ${idx + 1}`} />
                    {idx === lightbox && (
                      <div className="tape" style={{ top: -8, left: '50%', transform: 'translateX(-50%) rotate(-2deg)', width: 40, height: 16 }}></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── NEXT PROJECT ─── */}
      <section className={styles.nextSection}>
        <motion.a
          href={`/work/${nextProject.slug}`}
          className={styles.nextCard}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4 }}
        >
          <div className="tape" style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }}></div>
          <span className="handwritten" style={{ fontSize: '1.4rem', color: '#888' }}>Next Project</span>
          <h2>{nextProject.title} →</h2>
        </motion.a>
      </section>
    </div>
  )
}

