import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
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

  return (
    <div className={styles.detailPage}>
      {/* 1. Project Hero (Folder Cover) */}
      <section className={styles.heroSection}>
        <a href="/#work" className={styles.backBtn}>
          ← BACK TO FOLDERS
        </a>
        <div className={styles.folderCover}>
          <div className="tape" style={{ top: -15, right: '20%', transform: 'rotate(5deg)', width: 100 }}></div>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <div className={styles.metaLabel}>
            <span className="marker" style={{fontSize: '1.5rem'}}>{project.year}</span> | {project.category}
          </div>
          <div className={styles.polaroidHero}>
            <div className="tape" style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }}></div>
            <div className={styles.heroImg}>
              {project.title.substring(0, 1)}
            </div>
            <span className="polaroid-caption">v1.0 Screenshot</span>
          </div>
        </div>
      </section>

      {/* 2. Overview / Sticky Notes */}
      <section className={styles.overviewSection}>
        <div className={styles.grid}>
          <motion.div 
            className={styles.visionCard}
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            viewport={{ once: true }}
          >
            <div className="tape" style={{ top: -15, left: '10%', transform: 'rotate(-4deg)' }}></div>
            <h2>THE VISION</h2>
            <p>{project.vision}</p>
          </motion.div>

          <motion.div 
            className={styles.techStack}
            initial={{ opacity: 0, rotate: 5 }}
            whileInView={{ opacity: 1, rotate: 3 }}
            viewport={{ once: true }}
          >
            <h2>TECH STACK</h2>
            <ul>
              {project.techStack.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 3. Process Paper */}
      <section className={styles.processSection}>
        <div className={styles.linedPaper}>
          <div className="tape" style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>
          <h2 className="marker" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Process & Chaos</h2>
          <ol>
            {project.process.map((step, index) => (
              <li key={index}><span className="highlight">{step}</span></li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Challenges (Scraps) */}
      <section className={styles.challengesSection}>
        <h2 className={styles.sectionTitle} style={{textAlign: 'center', marginBottom: 50}}>THE WALL OF FIRE</h2>
        <div className={styles.grid}>
          {project.challenges.map((challenge, index) => (
            <motion.div 
              key={index}
              className={styles.challengeScrap}
              style={{ transform: `rotate(${index % 2 === 0 ? -3 : 4}deg)` }}
              whileHover={{ scale: 1.05 }}
            >
              <h3>ISSUE: {challenge.title}</h3>
              <div style={{borderBottom: '2px dashed #000', margin: '15px 0'}}></div>
              <p className="handwritten" style={{color: 'var(--red-marker)'}}>FIX: {challenge.solution}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Next Project */}
      <section className={styles.nextNavSection}>
        <div className={styles.nextNavCard}>
          <span className="handwritten">Onto the next folder...</span>
          <h2><a href={`/work/${nextProject.slug}`}>{nextProject.title} →</a></h2>
        </div>
      </section>
    </div>
  )
}
