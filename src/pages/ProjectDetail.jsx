import { useParams, useNavigate, Link } from 'react-router-dom'
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
  const [lightbox, setLightbox] = useState(null)
  const [[page, direction], setPage] = useState([0, 0])

  const changeSlide = (newIndex, newDirection) => {
    setPage([newIndex, newDirection])
    setLightbox(newIndex)
  }

  const openLightbox = (index) => {
    setPage([index, 1])
    setLightbox(index)
  }

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
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, rotate: dir > 0 ? 6 : -6, scale: 0.9 }),
    center: { x: 0, opacity: 1, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0, rotate: dir < 0 ? 6 : -6, scale: 0.9, transition: { duration: 0.25 } }),
  }

  return (
    <div className={styles.detailPage}>
      
      {/* ─── LEVEL 1: HERO (DISPLAY HEADING) ─── */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <Link to="/#work" className={styles.backBtn}>← Return to Desk</Link>

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
            <span className={styles.metaTag}>{project.year}</span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.metaTag}
                style={{ background: 'rgba(40, 167, 69, 0.2)', borderColor: '#28a745', color: '#28a745', textDecoration: 'none' }}
              >
                {project.liveUrl.includes('github.com') ? '↗ SOURCE CODE' : '↗ LIVE DEPLOYMENT'}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ─── DESK LAYOUT ─── */}
      <div className={styles.deskLayout}>

        {/* ─── GROUP 1: BRIEF NOTEBOOK & STICKIES ─── */}
        <div className={styles.heroOverlapGroup}>
          
          <motion.div 
            className={styles.notebookPaper}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {project.problem && (
              <div className={styles.notebookSection}>
                <h2 className={styles.notebookHeading}>Problem</h2>
                <p className={styles.bodyText}>{project.problem}</p>
              </div>
            )}
            {project.goal && (
              <div className={styles.notebookSection}>
                <h2 className={styles.notebookHeading}>Goal</h2>
                <p className={styles.bodyText}>{project.goal}</p>
              </div>
            )}
            {project.solution && (
              <div className={styles.notebookSection}>
                <h2 className={styles.notebookHeading}>Solution</h2>
                <p className={styles.bodyText}>{project.solution}</p>
              </div>
            )}
          </motion.div>

          <div className={styles.sidebarStack}>
            <motion.div 
              className={styles.stickyNote}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ transform: 'rotate(-2deg)' }}
            >
              <h3 className={styles.stickyHeader}>Project Manifest</h3>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>ROLE</span>
                <span className={styles.metaValue}>{project.role}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>TEAM</span>
                <span className={styles.metaValue}>{project.team}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>DURATION</span>
                <span className={styles.metaValue}>{project.duration}</span>
              </div>
            </motion.div>

            <motion.div 
              className={styles.stickyNote}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ transform: 'rotate(1deg)' }}
            >
              <h3 className={styles.stickyHeader}>Tech Stack</h3>
              <ul className={styles.techList}>
                {project.techStack.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* ─── GROUP 2: ARCHITECTURE BLUEPRINT ─── */}
        {project.architecture && (
          <motion.div 
            className={styles.blueprintSection}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`${styles.sectionHeading} ${styles.sectionHeadingLight}`}>System Architecture</h2>
            <p className={styles.blueprintDesc}>{project.architecture}</p>

            <div className={styles.blueprintDiagram}>
              <span className={`${styles.handwrittenAccent} ${styles.diagramNote}`}>* Request Flow</span>
              <div className={styles.flowRow}>
                <div className={styles.flowBox}>Client</div>
                <div className={styles.flowArrow}>→</div>
                <div className={styles.flowBox}>{project.techStack[0] || 'Frontend'}</div>
                <div className={styles.flowArrow}>→</div>
                <div className={styles.flowBox}>API</div>
                {project.techStack.length > 2 && (
                  <>
                    <div className={styles.flowArrow}>→</div>
                    <div className={styles.flowBox}>{project.techStack[project.techStack.length - 1]}</div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── GROUP 3: CHALLENGES & DECISIONS ─── */}
        <div className={styles.engineeringGroup}>
          
          {project.challenges && project.challenges.length > 0 && (
            <motion.div 
              className={styles.notebookPaper}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.sectionHeading} style={{ textAlign: 'left', marginBottom: '40px' }}>
                Incident Reports
              </h2>
              {project.challenges.map((challenge, index) => (
                <div key={index} className={styles.challengeBlock}>
                  <div className={styles.challengeTitleRow}>
                    <h3 className={styles.notebookHeading} style={{ marginBottom: 0 }}>
                      {challenge.title}
                    </h3>
                    <span className={styles.resolvedTag}>RESOLVED</span>
                  </div>
                  <p className={styles.bodyText}>{challenge.solution}</p>
                </div>
              ))}
            </motion.div>
          )}

          {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
            <div>
              <span className={`${styles.handwrittenAccent} ${styles.handwrittenRed}`} style={{ display: 'block', marginBottom: '20px' }}>
                Engineering Decisions ↓
              </span>
              <div className={styles.decisionsGrid}>
                {project.engineeringDecisions.map((dec, index) => (
                  <motion.div
                    key={index}
                    className={styles.stickyNote}
                    style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className={styles.stickyHeader} style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
                      {dec.decision}
                    </h4>
                    <span className={styles.decisionLabel}>REASON</span>
                    <p className={styles.bodyText} style={{ fontSize: '1.15rem', marginBottom: '20px' }}>{dec.reason}</p>
                    
                    <span className={styles.decisionLabel}>TRADEOFF</span>
                    <p className={`${styles.handwrittenAccent} ${styles.handwrittenRed}`} style={{ fontSize: '1.4rem' }}>
                      * {dec.tradeoff}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ─── GROUP 4: OUTCOMES NOTEBOOK ─── */}
        <motion.div 
          className={styles.outcomesSpread}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={`${styles.outcomesPage} ${styles.pageLeft}`}>
            <h2 className={styles.notebookHeading}>Deployment Log</h2>
            <ul className={styles.bulletList} style={{ marginBottom: '50px' }}>
              {project.results?.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>

            <h2 className={styles.notebookHeading}>Lessons Learned</h2>
            <ul className={styles.bulletList}>
              {project.lessonsLearned?.map((lesson, i) => (
                <li key={i}>{lesson}</li>
              ))}
            </ul>
          </div>

          <div className={`${styles.outcomesPage} ${styles.pageRight}`}>
            <h2 className={styles.notebookHeading}>Future Iteration</h2>
            <ul className={`${styles.bulletList} ${styles.future}`}>
              {project.futureImprovements?.map((imp, i) => (
                <li key={i}>{imp}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ─── GROUP 5: GALLERY ─── */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className={styles.galleryGroup}>
            
            <h2 className={styles.sectionHeading}>Evidence Gallery</h2>

            <div className={styles.galleryFeatured}>
              <motion.div
                className={styles.polaroidPhoto}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => openLightbox(0)}
                style={{ transform: 'rotate(-1deg)' }}
              >
                <img src={project.screenshots[0]} alt={`${project.title} featured view`} />
                <div className={styles.photoCaption}>Primary System Interface</div>
              </motion.div>
            </div>

            {project.screenshots.length > 1 && (
              <div className={styles.galleryGrid}>
                {project.screenshots.slice(1).map((src, idx) => {
                  const index = idx + 1;
                  const captions = [
                    "Component Architecture",
                    "Data Visualization",
                    "User Dashboard",
                    "State Management"
                  ];
                  return (
                    <motion.div
                      key={index}
                      className={styles.polaroidPhoto}
                      style={{ transform: `rotate(${idx % 2 === 0 ? 1.5 : -1.5}deg)` }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => openLightbox(index)}
                    >
                      <img src={src} alt={`${project.title} screenshot ${index + 1}`} />
                      <div className={styles.photoCaption}>
                        {captions[idx % captions.length]}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─── NEXT PROJECT ─── */}
        <div className={styles.nextFolderSection}>
          <motion.a
            href={`/work/${nextProject.slug}`}
            className={styles.nextFolderCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.handwrittenAccent}>Next Case File →</span>
            <h2 className={styles.projectTitle} style={{ color: 'var(--black)', fontSize: '2.5rem', marginBottom: 0 }}>
              {nextProject.title}
            </h2>
          </motion.a>
        </div>

      </div>

      {/* ─── LIGHTBOX ─── */}
      <AnimatePresence>
        {lightbox !== null && project.screenshots && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <div className={styles.lightboxHeader} onClick={(e) => e.stopPropagation()}>
              <span className={styles.handwrittenAccent} style={{ color: '#fff', fontSize: '1.3rem' }}>
                {project.title} Evidence — Figure {lightbox + 1} of {project.screenshots.length}
              </span>
              <button className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close">
                ✕ ESC
              </button>
            </div>

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
                    if (swipe < -50) changeSlide((lightbox + 1) % project.screenshots.length, 1)
                    else if (swipe > 50) changeSlide((lightbox - 1 + project.screenshots.length) % project.screenshots.length, -1)
                  }}
                >
                  <img src={project.screenshots[lightbox]} alt={`${project.title} screenshot ${lightbox + 1}`} />
                  <div className={`${styles.photoCaption} ${styles.handwrittenAccent}`} style={{ bottom: '10px' }}>
                    EVIDENCE 0{lightbox + 1}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

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

            <div className={styles.filmstripTray} onClick={(e) => e.stopPropagation()}>
              <span className={styles.handwrittenAccent} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: '0 0 10px 0', display: 'block' }}>
                ← Click slide or use Arrow Keys to navigate →
              </span>
              <div className={styles.filmstripRow}>
                {project.screenshots.map((src, idx) => (
                  <motion.div
                    key={idx}
                    className={`${styles.filmstripThumb} ${idx === lightbox ? styles.filmstripActive : ''}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => changeSlide(idx, idx > lightbox ? 1 : -1)}
                  >
                    <img src={src} alt={`Thumbnail ${idx + 1}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
