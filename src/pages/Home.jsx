import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import styles from './Home.module.css';
import { ArrowDownRight, Wrench, Hammer, Drill, Ruler, CheckCircle } from 'lucide-react';










export default function Home() {
  const deskRef = useRef(null);
  const notebookRef = useRef(null);
  const pegboardRef = useRef(null);

  const groupedSkills = {
    Languages: skillsData.filter((s) => s.category === "Languages"),
    Frameworks: skillsData.filter((s) => s.category === "Frameworks"),
    Specialties: skillsData.filter((s) => s.category === "Specialties"),
    Tools: skillsData.filter((s) => s.category === "Tools"),
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 80;
    const y = (e.clientY / window.innerHeight - 0.5) * 80;
    setMousePos({ x, y });
  };

  return (
    <div className={styles.home}>
      <section 
        className={styles.heroSection} 
        ref={deskRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      >
        <div 
          className={styles.heroWatermark}
          style={{ transform: `translate(-50%, -50%) translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
        >
          ARMAAN
        </div>
        <div className={styles.heroGrid}>
          <motion.div 
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
          >
            <h1 className={styles.heroTitle}>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 50, rotate: -5 },
                  visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 12 } }
                }}
              >
                CRAFTING
              </motion.span>
              <motion.span 
                className={styles.highlightText}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, rotate: 5 },
                  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 15 } }
                }}
              >
                DIGITAL
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: -50, rotate: 3 },
                  visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 12 } }
                }}
              >
                EXPERIENCES
              </motion.span>
            </h1>
            <motion.p 
              className={styles.heroSub}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
              }}
            >
              Freelance creative developer building fast, engaging, and production-ready web experiences.
            </motion.p>

            <motion.div 
              className={styles.ctaGroup}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
              }}
            >
              <a href="mailto:hello@example.com" className={styles.btnPrimary}>
                <span>HIRE ME</span> — Let's Talk
              </a>
              <a href="#work" className={styles.btnSecondary}>
                View Services
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.scrollArrow}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <svg viewBox="0 0 100 200" width="40" height="80">
             <path d="M50,0 Q60,100 50,180 M20,150 Q50,185 50,185 Q50,185 80,140" fill="none" stroke="var(--white)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </section>

      <section className={styles.projectsSection} id="work">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The Project Board</h2>
          <div className="tape" style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }}></div>
        </div>

        <div className={styles.boardGrid}>
          {projectsData.map((project, idx) => {
            const isFeatured = idx === 0;
            /* Unique subtle rotations per card */
            const rotations = [0, -1.5, 2, -1, 1.5, 1, -2];
            const rot = rotations[idx] || 0;
            /* Tape angle variety */
            const tapeAngles = [2, -3, 4, -2, 3, -4, 2];
            const tapeRot = tapeAngles[idx] || 0;
            /* Tape position variety */
            const tapePositions = ['50%', '30%', '70%', '50%', '40%', '60%', '50%'];
            const tapeLeft = tapePositions[idx] || '50%';
            /* Decoration: 0=clip, 1=folded, 2=stamp, 3=worn, 4=clip, 5=folded, 6=worn */
            const decoType = idx % 4;
            /* Reference numbers */
            const refNums = ['FW-001', 'ZS-002', 'NT-003', 'CG-004', 'EL-005', 'PT-006', 'GL-007'];

            return (
              <motion.div 
                key={project.slug} 
                className={`${styles.curatedPolaroid} ${isFeatured ? styles.featuredPolaroid : ''} ${!isFeatured && decoType === 1 ? styles.foldedCorner : ''} ${!isFeatured && decoType === 3 ? styles.wornEdge : ''}`}
                initial={{ opacity: 0, scale: 0.85, rotate: rot - 10, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rot, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 220, damping: 16 }}
                onClick={() => window.location.href = `/work/${project.slug}`}
              >
                {/* Tape — varied position */}
                <div className="tape" style={{ top: -15, left: tapeLeft, transform: `translateX(-50%) rotate(${tapeRot}deg)` }}></div>
                
                {/* Decorations — unique per card */}
                {!isFeatured && decoType === 0 && <div className={styles.paperClip} style={{top: -20, right: 20, transform: 'rotate(10deg)'}}></div>}
                {!isFeatured && decoType === 2 && <div className={styles.stamp} style={{bottom: 50, right: 15, transform: 'rotate(-12deg)'}}>APPROVED</div>}
                {isFeatured && <div className={styles.stamp} style={{top: -15, right: 30, transform: 'rotate(6deg)', borderColor: 'var(--blue-ink)', color: 'var(--blue-ink)'}}>FEATURED</div>}
                
                {/* Reference number — tiny pencil note */}
                {!isFeatured && (
                  <span className="handwritten" style={{position: 'absolute', bottom: 12, left: 15, fontSize: '0.9rem', color: '#aaa', opacity: 0.7}}>
                    Ref: {refNums[idx]}
                  </span>
                )}
                
                {isFeatured ? (
                  <>
                    <div className={styles.featuredTitleRow}>
                      <h3 className={styles.featuredTitleCenter}>{project.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span className={styles.featuredCategoryText}>{project.category}</span>
                        <span className="handwritten" style={{ fontSize: '1.2rem', color: '#999' }}>— {project.year}</span>
                      </div>
                    </div>

                    <div className={styles.featuredPhotoContainer}>
                      <div className="tape" style={{ top: -15, left: '45%', transform: `translateX(-50%) rotate(3deg)` }}></div>
                      <img src={project.heroImage} alt={project.title} className={styles.polaroidImage} />
                      <span className="handwritten" style={{display: 'block', textAlign: 'center', marginTop: '6px', fontSize: '1rem', color: '#999'}}>
                        Homepage • Desktop
                      </span>
                    </div>

                    <div className={styles.polaroidContent}>
                      <p className={styles.featuredSummary}>
                        {project.overview || project.summary}
                      </p>

                      <div className={styles.polaroidTech}>
                        {project.techStack.map((tech) => (
                          <span key={tech} className={styles.featuredTech}>
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className={styles.featuredCTA} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <button className={styles.paperButton} onClick={(e) => { e.stopPropagation(); window.location.href = `/work/${project.slug}`; }}>
                          → OPEN CASE FILE
                        </button>
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.paperButton}
                            style={{ background: 'var(--yellow-highlighter)', textDecoration: 'none', display: 'inline-block' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            ↗ VISIT LIVE SITE
                          </a>
                        )}
                      </div>

                      <div className={styles.paperClip} style={{top: '35%', right: -15, transform: 'rotate(90deg)'}}></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.polaroidHeader} style={{ justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '12px' }}>
                      <h3 className={styles.polaroidTitle} style={{ margin: 0 }}>{project.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span className={styles.smallCategoryText}>{project.category}</span>
                        <span className="handwritten" style={{ fontSize: '1rem', color: '#999' }}>— {project.year}</span>
                      </div>
                    </div>

                    <div className={styles.smallPhotoContainer}>
                      <div className="tape" style={{ top: -12, left: '50%', transform: `translateX(-50%) rotate(${tapeRot}deg)` }}></div>
                      {project.heroImage ? (
                        <img src={project.heroImage} alt={project.title} className={styles.polaroidImage} />
                      ) : (
                        <div className={styles.polaroidPhotoInner}>
                          {project.title.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="handwritten" style={{ display: 'block', textAlign: 'center', marginTop: '4px', fontSize: '0.85rem', color: '#999' }}>
                        Preview • {project.year}
                      </span>
                    </div>

                    <div className={styles.polaroidContent}>
                      <p className={styles.smallSummary}>{project.summary}</p>
                      <div className={styles.polaroidTech}>
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className={styles.featuredTech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className={styles.cardCTA}>
                        <button className={styles.paperButton} style={{ fontSize: '0.85rem', padding: '6px 14px' }} onClick={(e) => { e.stopPropagation(); window.location.href = `/work/${project.slug}`; }}>
                          → VIEW PROJECT
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className={styles.aboutSection} id="about">
        <div className="container">
          <div className={styles.aboutGrid}>
            <motion.div 
              style={{position: 'relative'}}
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            >
              <div className={styles.coffeeStain}></div>
              <motion.div 
                className={styles.aboutPhoto}
                initial={{ rotate: -3 }}
                whileHover={{ rotate: 2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="tape" style={{ top: -15, left: -10, transform: 'rotate(-45deg)' }}></div>
                <div className="tape" style={{ top: -15, right: -10, transform: 'rotate(45deg)' }}></div>
                <div style={{ width: '100%', height: '400px', backgroundColor: '#e0e0e0', border: '2px solid #000' }}></div>
                <span className="polaroid-caption" style={{bottom: 20}}>Headshot.jpg</span>
                <div className={styles.dateStamp}>JUN 2026</div>
              </motion.div>
            </motion.div>

            <motion.div 
              className={styles.aboutTextWrapper}
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              <div className={styles.notebookPage} ref={notebookRef}>
                <div className={styles.notebookHeader}>
                  <h2 className="marker" style={{ fontSize: '3.5rem', transform: 'rotate(-2deg)' }}>ABOUT ME</h2>
                  <span className={styles.dateStampSmall}>Last updated: JUN 2026</span>
                </div>

                <div className={styles.notebookContent}>
                  <p style={{fontFamily: 'var(--font-handwritten)', fontSize: '1.8rem', lineHeight: '1.4', marginBottom: '20px'}}>
                    I'm <strong>Armaan</strong>, a <span className="highlight">creative developer</span> crafting <span className="marker" style={{color: 'var(--blue-ink)'}}>visually engaging, technically refined digital experiences</span>. I turn ideas into fast, interactive websites where thoughtful design meets clean, scalable code.
                  </p>
                  
                  <p style={{fontFamily: 'var(--font-handwritten)', fontSize: '1.8rem', lineHeight: '1.4', marginBottom: '20px'}}>
                    My approach focuses on <span className="marker" style={{color: 'var(--red-marker)'}}>intuitive UX</span>, <span className="marker" style={{color: 'var(--blue-ink)'}}>smooth interactions</span>, and <span className="highlight">performance</span>. Every project is an opportunity to build something meaningful that looks great and works seamlessly.
                  </p>

                  <p style={{fontFamily: 'var(--font-handwritten)', fontSize: '1.8rem', lineHeight: '1.4', marginBottom: '30px'}}>
                    Outside of development, I explore <span style={{color: 'var(--blue-ink)'}}>new design trends</span>, experiment with <span className="highlight">interactions</span>, and learn <span className="marker" style={{color: 'var(--red-marker)'}}>tools</span> to build better digital experiences.
                  </p>

                  <div className={styles.factGrid}>
                    <div className={styles.factItem}>
                      <div className="marker" style={{color: 'var(--blue-ink)', fontSize: '1.4rem'}}>CURRENT STATUS</div>
                      <div style={{fontFamily: 'var(--font-heading)', fontSize: '1.4rem'}}>ACCEPTING FREELANCE WORK</div>
                    </div>
                    <div className={styles.factItem}>
                      <div className="marker" style={{color: 'var(--blue-ink)', fontSize: '1.4rem'}}>CORE STRENGTH</div>
                      <div style={{fontFamily: 'var(--font-heading)', fontSize: '1.4rem'}}>CREATIVE ENGINEERING</div>
                    </div>
                  </div>

                  <motion.div 
                    className="sticky-note" 
                    style={{ position: 'absolute', right: '-100px', bottom: '-80px', width: '220px', rotate: 7, backgroundColor: 'rgba(255, 235, 59, 0.8)' }}
                    whileHover={{ scale: 1.05, rotate: 2, zIndex: 10, backgroundColor: 'rgba(255, 235, 59, 1)' }}
                    drag
                    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                  >
                    <div className="tape" style={{ top: -10, left: '50%', transform: 'translateX(-50%)', width: '80px' }}></div>
                    <strong className="marker" style={{fontSize: '1.2rem'}}>NOTE TO SELF:</strong><br/>
                    "Works on my machine" is a valid deployment strategy. Just ship the machine.
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.skillsSection} id="toolbox">
        <div ref={pegboardRef} className={styles.pegboard}>
          
          {/* Coffee stain floating on the wooden tabletop */}
          <div className={styles.coffeeStain} style={{ bottom: 20, right: 30, opacity: 0.15, transform: 'scale(0.85)', pointerEvents: 'none', position: 'absolute' }} />
          
          {/* Metadata parameters on the desk */}
          <div className={styles.pegboardStencilLeft} style={{ top: 55, left: 30 }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: '1px' }}>
              SYS: SCRAP_MOODBOARD // CL.04
            </span>
          </div>
          <div className={styles.pegboardStencilRight} style={{ top: 55, right: 30 }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: '1px' }}>
              REF: ARM_WORKSPACE_v1.0
            </span>
          </div>

          <div className={styles.pegboardTitleLabel}>
            <span>TECH STACK</span>
          </div>          <div className={styles.scrapsBoardContainer} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
            {[
              { name: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5/CSS3", "PHP", "SQL"], width: '320px', x: -10, y: 15, rot: -3, css: 'scrapLanguages', pin: 'tape' },
              { name: "Frameworks", items: ["React", "Next.js", "Vite", "WordPress"], width: '280px', x: 5, y: -10, rot: 4, css: 'scrapFrameworks', pin: 'staple' },
              { name: "Animation", items: ["Framer Motion", "GSAP", "Lenis Scroll", "Swup.js"], width: '340px', x: -5, y: 5, rot: -2, css: 'scrapSpecialties', pin: 'pin' },
              { name: "Design", items: ["Figma", "UI/UX Prototyping", "Wireframing", "Design Systems"], width: '300px', x: 15, y: 20, rot: 5, css: 'scrapTools', pin: 'clip' },
              { name: "Tools", items: ["Git / GitHub", "Webpack", "PostCSS", "Vercel"], width: '260px', x: -20, y: -15, rot: -4, css: 'scrapLanguages', pin: 'tape' }
            ].map((category, catIdx) => {
              
              return (
                <motion.div
                  key={category.name}
                  className={`${styles.scrapPaperCard} ${styles[category.css]}`}
                  style={{ 
                    rotate: category.rot,
                    position: 'relative',
                    width: category.width,
                    x: category.x,
                    y: category.y,
                    zIndex: 10 + catIdx
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    zIndex: 30,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {category.pin === 'tape' && <div className="tape" style={{ top: -10, left: '50%', transform: `translateX(-50%) rotate(${category.rot * -2}deg)` }}></div>}
                  {category.pin === 'staple' && <div className={styles.staple}></div>}
                  {category.pin === 'pin' && <div className={styles.pushPin} style={{top: -5, left: '50%', transform: 'translateX(-50%)'}}></div>}
                  {category.pin === 'clip' && <div className={styles.paperClip} style={{top: -20, left: 30, transform: 'rotate(-5deg)'}}></div>}
                  
                  {category.css === 'scrapFrameworks' && <div className={styles.scrapFrameworksMargin}></div>}

                  <h3 className={`${styles.scrapTitle} marker`} style={{ fontSize: '1.8rem', borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>{category.name}</h3>
                  <ul className={styles.scrapHandwrittenList} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {category.items.map(item => (
                      <li key={item} className={styles.scrapHandwrittenItem} style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.4rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={styles.scrapCheckbox}>~</span> <span className={styles.scrapSkillName}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <div className={styles.pegboardLedgeTop} />
          <div className={styles.pegboardLedge} />
        </div>
      </section>

      <section className={styles.contactSection} id="contact">
        <motion.div 
          className={styles.flyerPaper}
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.pushPin} style={{ top: 15, left: '50%', transform: 'translateX(-50%)' }}></div>
          
          <div className={styles.flyerContent}>
            <h2 className={styles.contactTitle}>Hire Me</h2>
            <p className={styles.contactText}>
              Need a digital experience, an interactive web application, or a creative technical solution? Let's discuss your next project.
            </p>
            
            <form className={styles.flyerForm} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Name..." className={styles.flyerInput} />
              <input type="email" placeholder="Email..." className={styles.flyerInput} />
              <textarea placeholder="Message..." rows="3" className={styles.flyerTextarea}></textarea>
              <button type="submit" className={styles.flyerSubmit}>Send Message</button>
            </form>
          </div>

          <div className={styles.tearOffTabs}>
            <a href="mailto:hello@example.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>Email</span>
            </a>
            <a href="https://github.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>GitHub</span>
            </a>
            <a href="https://twitter.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>Twitter</span>
            </a>
            <a href="https://linkedin.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>LinkedIn</span>
            </a>
            <a href="mailto:hello@example.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>Email</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
