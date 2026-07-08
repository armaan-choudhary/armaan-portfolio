import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import styles from './Home.module.css';
import { ArrowDownRight, Wrench, Hammer, Drill, Ruler, CheckCircle } from 'lucide-react';
import { FaReact, FaWordpress, FaPhp, FaDatabase, FaNodeJs, FaFigma, FaGitAlt, FaGithub, FaHtml5, FaCss3Alt, FaExchangeAlt } from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiFramer, 
  SiVite, 
  SiGreensock, 
  SiWebpack, 
  SiVercel 
} from 'react-icons/si';

const renderSkillIcon = (name) => {
  const norm = name.toLowerCase();
  const inkColor = "#222222"; // Uniform black newspaper print ink
  if (norm.includes('react')) return <FaReact size={68} color={inkColor} />;
  if (norm.includes('javascript')) return <SiJavascript size={68} color={inkColor} />;
  if (norm.includes('typescript')) return <SiTypescript size={68} color={inkColor} />;
  if (norm.includes('framer motion')) return <SiFramer size={68} color={inkColor} />;
  if (norm.includes('html5/css3')) return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
      <FaHtml5 size={46} color={inkColor} />
      <FaCss3Alt size={46} color={inkColor} />
    </div>
  );
  if (norm.includes('vite')) return <SiVite size={68} color={inkColor} />;
  if (norm.includes('gsap')) return <SiGreensock size={68} color={inkColor} />;
  if (norm.includes('swup')) return <FaExchangeAlt size={62} color={inkColor} />;
  if (norm.includes('wordpress')) return <FaWordpress size={68} color={inkColor} />;
  if (norm.includes('php')) return <FaPhp size={72} color={inkColor} />;
  if (norm.includes('sql')) return <FaDatabase size={62} color={inkColor} />;
  if (norm.includes('node')) return <FaNodeJs size={68} color={inkColor} />;
  if (norm.includes('figma')) return <FaFigma size={64} color={inkColor} />;
  if (norm.includes('git')) return <FaGitAlt size={68} color={inkColor} />;
  if (norm.includes('webpack')) return <SiWebpack size={68} color={inkColor} />;
  if (norm.includes('vercel')) return <SiVercel size={62} color={inkColor} />;
  return <FaDatabase size={62} color={inkColor} />;
};

export default function Home() {
  const navigate = useNavigate();
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
                View Projects
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
            const refNums = ['FW-001', 'QT-002', 'ZO-003', 'NT-004', 'CG-005', 'EL-006', 'PT-007', 'GL-008'];
            const refCode = refNums[idx] || (project.title.substring(0, 2).toUpperCase() + '-' + String(idx + 1).padStart(3, '0'));

            return (
              <motion.div 
                key={project.slug} 
                className={`${styles.curatedPolaroid} ${isFeatured ? styles.featuredPolaroid : ''} ${!isFeatured && decoType === 1 ? styles.foldedCorner : ''} ${!isFeatured && decoType === 3 ? styles.wornEdge : ''}`}
                initial={{ opacity: 0, scale: 0.85, rotate: rot - 10, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rot, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 220, damping: 16 }}
                onClick={() => navigate(`/work/${project.slug}`)}
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
                    Ref: {refCode}
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
                        <button className={styles.paperButton} onClick={(e) => { e.stopPropagation(); navigate(`/work/${project.slug}`); }}>
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
                        <button className={styles.paperButton} style={{ fontSize: '0.85rem', padding: '6px 14px' }} onClick={(e) => { e.stopPropagation(); navigate(`/work/${project.slug}`); }}>
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
                    className={`sticky-note ${styles.stickyNoteAbout}`}
                    whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
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

      <section className={styles.skillsSection} id="skills">
        <div className={styles.broadsheetContainer}>
          {/* Skeuomorphic corner anchors */}
          <div className={styles.broadsheetStapleL} />
          <div className={styles.broadsheetStapleR} />
          
          <div className={styles.broadsheetPaper}>
            {/* Front Page Broadsheet Header */}
            <div className={styles.broadsheetHeader}>
              <div className={styles.headerTopMeta}>
                <span>VOL. CLXV // NO. 482</span>
                <span className="handwritten">"All the Tech That's Fit to Code"</span>
                <span>PRICE: ZERO CENTS</span>
              </div>
              <h2 className={styles.broadsheetTitle}>THE SKILL BILL BULLETIN</h2>
              <div className={styles.headerBottomMeta}>
                <span>METROPOLIS EDITION</span>
                <span>JULY 8, 2026</span>
                <span>CLASSIFIED TECH STACK</span>
              </div>
            </div>

            {/* Articles Grid (Broadsheet columns) */}
            <div className={styles.broadsheetGrid}>
              {[
                { name: "React", level: "EXPERT CORE LAUNCHED", desc: "React designated as primary UI stack for advanced modular building." },
                { name: "JavaScript", level: "DAILY LOGIC CONFIRMED", desc: "Vanilla scripts verified running client-side at optimal speeds." },
                { name: "TypeScript", level: "STATIC TYPING ADOPTED", desc: "Strict compiler checks prevent runtime errors in production code." },
                { name: "Framer Motion", level: "FLUID INTERACTION ALIVE", desc: "Spring animations bring interface elements to life smoothly." },
                { name: "HTML5/CSS3", level: "SEMANTIC LAYOUT APPROVED", desc: "Semantic markup and CSS grid systems create responsive structures." },
                { name: "Vite", level: "COMPILATION SPEEDS SOAR", desc: "Fast dev server speeds up builds and HMR cycles." },
                { name: "GSAP", level: "COMPLEX TIMELINES SYNCED", desc: "Vector graphics animate across multi-stage timelines smoothly." },
                { name: "Swup.js", level: "PAGE TRANSITIONS INTEGRATED", desc: "Seamless transitions enhance user journey between paths." },
                { name: "WordPress", level: "THEMING MASTERED", desc: "Custom themes and Gutenberg systems engineered to specs." },
                { name: "PHP", level: "OOP ARCHITECTURE DEPLOYED", desc: "Clean object-oriented PHP code handles backend database operations." },
                { name: "SQL", level: "QUERIES OPTIMIZED", desc: "Relational database tables hold portfolio data under strict queries." },
                { name: "Node.js", level: "SERVER-SIDE SCRIPTS SECURED", desc: "Asynchronous scripts handle backend dependencies effectively." },
                { name: "Figma", level: "HI-FI WIREFRAMING COMPLETE", desc: "Prototypes and layouts designed ahead of active code writing." },
                { name: "Git & GitHub", level: "VERSION CONTROL COMPULSORY", desc: "Repository commits logged daily to track modular changes." },
                { name: "Webpack", level: "BUNDLING PROCESS CONFIGURED", desc: "Bundling systems optimized for production-ready packages." },
                { name: "Vercel", level: "DEPLOYMENT SPEEDS MAXIMIZED", desc: "Static applications hosted on edge networks with zero downtime." }
              ].map((skill, idx) => {
                return (
                  <div key={skill.name} className={styles.broadsheetArticle}>
                    <div className={styles.articleHeader}>
                      <span className={styles.articleSectionNum}>SECTION {idx + 1}</span>
                      <h4 className={styles.articleHeadline}>{skill.name}: {skill.level}</h4>
                    </div>
                    <div className={styles.articleBody}>
                      <div className={styles.newspaperLogoBox}>
                        {renderSkillIcon(skill.name)}
                      </div>
                      <p className={styles.articleText}>{skill.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
