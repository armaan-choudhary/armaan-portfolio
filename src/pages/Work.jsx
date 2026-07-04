import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Polaroid from '../components/ui/Polaroid.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Sticker from '../components/ui/Sticker.jsx'
import Divider from '../components/ui/Divider.jsx'
import projectsData from '../data/projects.json'
import styles from './Work.module.css'

const categories = ['All', 'Full-Stack Development', 'Front-End Development', 'AI & Full-Stack Development', 'Hackathon Project']

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory)

  return (
    <div className={styles.workPage}>
      <section className={styles.titleSection}>
        <div className="container">
          <div className={styles.titleHeader}>
            <SectionTitle rotate={-1} annotation="Projects built for scale and performance">
              Selected Work
            </SectionTitle>
            <p className={styles.introText}>
              A curated collection of production-ready applications, system architectures, and AI integrations. These projects demonstrate a commitment to robust engineering and scalable design.
            </p>
          </div>

          <div className={styles.filterBar}>
            <span className={`${styles.filterLabel} handwritten`}>Filter by Category:</span>
            <div className={styles.filters}>
              {categories.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Divider variant="block" />

      <section className={styles.gridSection}>
        <div className="container">
          <motion.div layout className={styles.projectGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const rotations = [-3, 2, -1, 3, -2, 4]
                const tapeRotations = [4, -5, 3, -3, 5, -4]
                const rot = rotations[index % rotations.length]
                const tapeRot = tapeRotations[index % tapeRotations.length]

                return (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  >
                    <Polaroid
                      to={`/work/${project.slug}`}
                      title={project.title}
                      category={project.category}
                      image={project.heroImage}
                      rotate={rot}
                      tapeRotate={tapeRot}
                      index={index}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className={styles.emptyState}>
              <Sticker rotate={0} color="yellow">No projects found</Sticker>
              <p className={styles.emptyText}>Looks like there's nothing in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
