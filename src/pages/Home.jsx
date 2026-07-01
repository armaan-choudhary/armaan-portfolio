import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import styles from './Home.module.css';
import { ArrowDownRight } from 'lucide-react';

export default function Home() {
  const deskRef = useRef(null);
  const notebookRef = useRef(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 80;
    const y = (e.clientY / window.innerHeight - 0.5) * 80;
    setMousePos({ x, y });
  };

  return (
    <div className={styles.home}>
      {/* SECTION 1: HERO / COVER PAGE */}
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
                DIGITAL
              </motion.span>
              <motion.span 
                className={styles.highlightText}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, rotate: 5 },
                  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 15 } }
                }}
              >
                SCRAPBOOK
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: -50, rotate: 3 },
                  visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 12 } }
                }}
              >
                PORTFOLIO
              </motion.span>
            </h1>
            <motion.p 
              className={styles.heroSub}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
              }}
            >
              Hi, I'm <strong style={{color: 'var(--yellow)'}}>Armaan Choudhary</strong>. I combine raw brutalist design with robust engineering to build web products that refuse to be ignored. Welcome to my creative journal.
            </motion.p>

            <motion.div 
              className={styles.ctaGroup}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
              }}
            >
              <a href="mailto:hello@example.com" className={styles.btnPrimary}>
                <span>VIP PASS</span> — Say Hello
              </a>
              <a href="#work" className={styles.btnSecondary}>
                View Work
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Hand-drawn Scroll Arrow breaking out of the grid */}
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

      {/* SECTION 2: PROJECTS / PINNED BOARD */}
      <section className={styles.projectsSection} id="work">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Selected Works</h2>
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
                      {isFeatured ? "Masterpiece." : (project.challenges?.[0]?.title || "A wild ride.")}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: ABOUT / JOURNAL */}
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
              <div className={styles.dateStamp}>JUL 2026</div>
              <div className={styles.coffeeStain}></div>
              <motion.div 
                className={styles.aboutPhoto}
                whileHover={{ rotate: 0 }}
              >
                <div className="tape" style={{ top: -15, left: -10, transform: 'rotate(-45deg)' }}></div>
                <div className="tape" style={{ top: -15, right: -10, transform: 'rotate(45deg)' }}></div>
                <div style={{ width: '100%', height: '400px', backgroundColor: '#e0e0e0', border: '2px solid #000' }}></div>
                <span className="polaroid-caption" style={{bottom: 20}}>Headshot.jpg (I think)</span>
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
                  <h2 className="marker" style={{ fontSize: '3.5rem', transform: 'rotate(-2deg)' }}>THE MAN BEHIND</h2>
                  <span className={styles.dateStampSmall}>Last updated: JUL 2026</span>
                </div>

                <div className={styles.notebookContent}>
                  <p style={{fontFamily: 'var(--font-handwritten)', fontSize: '2rem', lineHeight: '1.4', marginBottom: '20px'}}>
                    I used to write <span style={{textDecoration: 'line-through', opacity: 0.5}}>boring corporate code</span> 
                    <br/>
                    <span className="marker" style={{color: 'var(--red-marker)', fontSize: '1.8rem', marginLeft: '10px'}}>weird, interactive web experiments</span>. 
                  </p>
                  
                  <p style={{fontFamily: 'var(--font-handwritten)', fontSize: '1.8rem', lineHeight: '1.4', marginBottom: '30px'}}>
                    The web has become too clean. I believe in design that feels <span className="highlight">physical, messy, and alive.</span> 
                    I spend my days writing reliable React modules and my nights finding beautiful ways to make things look deliberately broken.
                  </p>

                  <div className={styles.factGrid}>
                    <div className={styles.factItem}>
                      <div className="marker" style={{color: 'var(--blue-ink)', fontSize: '1.4rem'}}>CURRENT STATUS</div>
                      <div style={{fontFamily: 'var(--font-heading)', fontSize: '1.4rem'}}>BUILDING A DESIGN SYSTEM</div>
                    </div>
                    <div className={styles.factItem}>
                      <div className="marker" style={{color: 'var(--blue-ink)', fontSize: '1.4rem'}}>FUEL</div>
                      <div style={{fontFamily: 'var(--font-heading)', fontSize: '1.4rem'}}>BLACK COFFEE (CUP #3)</div>
                    </div>
                  </div>

                  <motion.div 
                    className="sticky-note" 
                    style={{ position: 'absolute', right: '-60px', bottom: '-30px', width: '220px', transform: 'rotate(7deg)' }}
                    whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
                    drag
                    dragConstraints={{ left: -24, right: 24, top: -24, bottom: 24 }}
                  >
                    <div className="tape" style={{ top: -10, left: '50%', transform: 'translateX(-50%)', width: '80px' }}></div>
                    <strong className="marker" style={{fontSize: '1.2rem'}}>NOTE TO SELF:</strong><br/>
                    Fix that one bug in the header. (Actually, call it a feature).
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE TECH STACK */}
      <section className={styles.skillsSection} id="skills">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>The Arsenal</h2>
          <div className="tape" style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>
        </div>

        <motion.div 
          className={styles.blackboard}
          initial={{ opacity: 0, scale: 0.9, rotate: -2, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
        >
          {skillsData.map((skill, idx) => {
            const rot = (Math.random() * 8 - 4).toFixed(1);
            const paperColors = [
              styles.scrapYellow,
              styles.scrapBlue,
              styles.scrapBlack,
              styles.scrapGreen,
              styles.scrapRed,
              styles.scrapWhite
            ];
            const colorClass = paperColors[idx % paperColors.length];

            return (
              <motion.div 
                key={skill.name} 
                className={`${styles.skillScrap} ${colorClass}`}
                style={{ rotate: `${rot}deg` }}
                whileHover={{ scale: 1.1, zIndex: 10, transition: { duration: 0.2 } }}
              >
                <div className={styles.skillPin}></div>
                {skill.name}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* SECTION 5: CONTACT / FLYER */}
      <section className={styles.contactSection} id="contact">
        <motion.div 
          className={styles.flyerPaper}
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.pushPin} style={{ top: 15, left: '50%', transform: 'translateX(-50%)' }}></div>
          
          <div className={styles.flyerContent}>
            <h2 className={styles.contactTitle}>Wanted!</h2>
            <p className={styles.contactText}>
              Got a project that needs a bit of chaos? Or just want to say hi? 
            </p>
            
            <form className={styles.flyerForm} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Name..." className={styles.flyerInput} />
              <input type="email" placeholder="Email..." className={styles.flyerInput} />
              <textarea placeholder="Message..." rows="3" className={styles.flyerTextarea}></textarea>
              <button type="submit" className={styles.flyerSubmit}>Send It!</button>
            </form>
          </div>

          <div className={styles.tearOffTabs}>
            <a href="mailto:hello@example.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>hello@armaan.com</span>
            </a>
            <a href="https://github.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>github/armaan</span>
            </a>
            <a href="https://twitter.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>@armaan_dev</span>
            </a>
            <a href="https://linkedin.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>linkedin/armaan</span>
            </a>
            <a href="mailto:hello@example.com" className={styles.tearOffTab}>
              <span className={styles.tearOffText}>hello@armaan.com</span>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
