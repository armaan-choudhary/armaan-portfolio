import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import styles from './Home.module.css';
import { ArrowDownRight, Wrench, Hammer, Drill, Ruler } from 'lucide-react';










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
          <h2 className={styles.sectionTitle}>Freelance Projects</h2>
          <div className="tape" style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }}></div>
        </div>

        <div className={styles.boardGrid}>
          {projectsData.map((project, idx) => {
            const isFeatured = idx === 0;
            const rot = (idx % 3 === 0) ? -1 : (idx % 2 === 0 ? 1 : 2);
            const tapeRot = idx % 2 === 0 ? 2 : -3;
            const decorationType = idx % 4;

            return (
              <motion.div 
                key={project.slug} 
                className={`${styles.curatedPolaroid} ${isFeatured ? styles.featuredPolaroid : ''}`}
                initial={{ opacity: 0, scale: 0.8, rotate: rot - 15, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rot, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15, type: "spring", stiffness: 250, damping: 15 }}
                onClick={() => window.location.href = `/work/${project.slug}`}
              >
                <div className="tape" style={{ top: -15, left: '50%', transform: `translateX(-50%) rotate(${tapeRot}deg)` }}></div>
                
                {decorationType === 0 && !isFeatured && <div className={styles.paperClip} style={{top: -20, right: 20}}></div>}
                {decorationType === 2 && !isFeatured && <div className={styles.stamp} style={{bottom: 20, right: 20, transform: 'rotate(-15deg)'}}>APPROVED</div>}
                {isFeatured && <div className={styles.stamp} style={{top: -20, right: -20, transform: 'rotate(10deg)', borderColor: 'var(--blue-ink)', color: 'var(--blue-ink)'}}>FEATURED</div>}
                
                <div className={styles.polaroidPhoto}>
                   <div className={styles.polaroidPhotoInner}>
                     {project.title.substring(0, 2).toUpperCase()}
                   </div>
                </div>

                <div className={styles.polaroidContent}>
                  <div className={styles.polaroidHeader}>
                    <h3 className={styles.polaroidTitle}>{project.title}</h3>
                    <span className={styles.polaroidCategory}>{project.category}</span>
                  </div>
                  
                  <p className={styles.polaroidSummary}>{project.summary}</p>
                  
                  <div className={styles.polaroidTech}>
                    {project.techStack.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}
                  </div>
                  
                  <div className={styles.polaroidAnnotation}>
                    <span className="marker" style={{color: 'var(--blue-ink)'}}>
                      {isFeatured ? "Client Approved." : (project.challenges?.[0]?.title || "Delivered on time.")}
                    </span>
                  </div>
                </div>
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
          <div className={styles.pegboardStencilLeft} style={{ top: 20, left: 30 }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.4)', fontFamily: 'monospace', letterSpacing: '1px' }}>
              SYS: SCRAP_MOODBOARD // CL.04
            </span>
          </div>
          <div className={styles.pegboardStencilRight} style={{ top: 20, right: 30 }}>
            <span style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.4)', fontFamily: 'monospace', letterSpacing: '1px' }}>
              REF: ARM_WORKSPACE_v1.0
            </span>
          </div>

          <div className={styles.pegboardTitleLabel}>
            <span>TECH STACK</span>
          </div>

          <div className={styles.scrapsBoardContainer}>
            {["Languages", "Frameworks", "Specialties", "Tools"].map((category, catIdx) => {
              // Rotation angles, offsets, and overlaps for messy collage effect
              const tilts = [-12, 5, -8, 14];
              const offsetsX = [30, -25, -60, -40]; 
              const offsetsY = [-15, 60, -30, 45];
              const zIndexes = [20, 21, 22, 23];   // Ensure they stack correctly
              
              const tilt = tilts[catIdx];
              const xOffset = offsetsX[catIdx];
              const yOffset = offsetsY[catIdx];
              const zBase = zIndexes[catIdx];
              
              // Attachment type: 0 = Paperclip, 1 = Staple, 2 = Push-pin, 3 = Masking Tape
              const attachmentType = catIdx;
              
              // Hand-drawn bullets
              const bullets = ["~", "-", "•", "x"];
              const bullet = bullets[catIdx];
              
              return (
                <motion.div
                  key={category}
                  className={`${styles.scrapPaperCard} ${styles[`scrap${category}`]}`}
                  style={{ 
                    rotate: tilt, 
                    x: xOffset, 
                    y: yOffset,
                    zIndex: zBase
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: tilt * 0.2, 
                    y: yOffset - 15,
                    zIndex: 30,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  {/* Render the appropriate fastener */}
                  {attachmentType === 0 && <div className={styles.paperClip} style={{ top: -18, left: 30, transform: 'rotate(-5deg)' }} />}
                  {attachmentType === 1 && <div className={styles.staple} />}
                  {attachmentType === 2 && <div className={styles.pushPin} style={{ top: -14, left: '50%', transform: 'translateX(-50%)' }} />}
                  {attachmentType === 3 && <div className={styles.stationeryCardTape} style={{ top: -12, right: 25, transform: 'rotate(25deg)' }} />}

                  {category === "Frameworks" && <div className={styles.scrapFrameworksMargin} />}
                  <h3 className={styles.scrapTitle}>{category}</h3>
                  
                  <ul className={styles.scrapHandwrittenList}>
                    {groupedSkills[category].map((skill) => (
                      <li key={skill.name} className={styles.scrapHandwrittenItem}>
                        <span className={styles.scrapCheckbox}>{bullet}</span>
                        <span className={styles.scrapSkillName}>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

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
