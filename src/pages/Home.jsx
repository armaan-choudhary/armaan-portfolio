import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import styles from './Home.module.css';

import { FaReact, FaWordpress, FaPhp, FaDatabase, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiFramer, SiVite } from 'react-icons/si';

const renderSkillIcon = (name) => {
  const norm = name.toLowerCase();
  const inkColor = "#222222"; 
  if (norm.includes('react')) return <FaReact size={35} color={inkColor} />;
  if (norm.includes('javascript')) return <SiJavascript size={35} color={inkColor} />;
  if (norm.includes('typescript')) return <SiTypescript size={35} color={inkColor} />;
  if (norm.includes('framer motion')) return <SiFramer size={35} color={inkColor} />;
  if (norm.includes('html5/css3')) return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-start', alignItems: 'center' }}>
      <FaHtml5 size={28} color={inkColor} />
      <FaCss3Alt size={28} color={inkColor} />
    </div>
  );
  if (norm.includes('vite')) return <SiVite size={35} color={inkColor} />;
  if (norm.includes('wordpress')) return <FaWordpress size={35} color={inkColor} />;
  if (norm.includes('php')) return <FaPhp size={35} color={inkColor} />;
  if (norm.includes('node')) return <FaNodeJs size={35} color={inkColor} />;
  if (norm.includes('git')) return <FaGitAlt size={35} color={inkColor} />;
  return <FaDatabase size={35} color={inkColor} />;
};

export default function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', message: '', _honeypot: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Required';
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData._honeypot) return;
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setFormSubmitStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', _honeypot: '' });
    } catch (err) {
      setFormSubmitStatus('error');
    }
  };

  return (
    <div className={styles.home}>
      
      <div className={styles.deskEnvironment}>
        
        {/* ─── OBJECT 1: COVER SHEET (Who is this?) ─── */}
        <section className={styles.coverSheetSection}>
          <motion.div 
            className={styles.coverSheet}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.tapeSingle} style={{ top: -15, left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }}></div>
            
            <div className={styles.coverHeader}>
              <span>FILE: AC-26</span>
              <span>CONFIDENTIAL</span>
            </div>
            
            <h1 className={styles.displayTitle} style={{ marginBottom: '30px' }}>
              ARMAAN <br/>CHOUDHARY
            </h1>
            
            <p className={styles.bodyText} style={{ fontSize: '1.5rem', maxWidth: '650px' }}>
              Software Engineer specializing in full-stack architecture, high-performance UI, and secure AI integrations.
            </p>

            <div style={{ display: 'flex', gap: '20px', marginTop: '40px', alignItems: 'center' }}>
              <a href="#work" className={styles.primaryCta}>VIEW PROJECTS</a>
              <a href="/Resume.pdf" target="_blank" rel="noreferrer" className={styles.secondaryCta}>DOWNLOAD RESUME</a>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              <a href="https://github.com/armaan-choudhary" target="_blank" rel="noreferrer" className={styles.tertiaryLink}>GITHUB</a>
            </div>
          </motion.div>
        </section>

        {/* ─── OBJECT 2: PROJECT BOARD (What do they build? VISUAL CLIMAX) ─── */}
        <section className={styles.projectBoardSection} id="work">
          <div className={styles.boardIntro}>
            <h2 className={`${styles.displayTitle} ${styles.displayTitleLight}`} style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}>PROJECT BOARD</h2>
          </div>
          
          <div className={styles.boardGrid}>
            {/* The Featured Project takes center stage */}
            {projectsData.length > 0 && (
              <motion.div 
                className={`${styles.featuredPolaroid} ${styles.paperLift}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                onClick={() => navigate(`/work/${projectsData[0].slug}`)}
                style={{ cursor: 'pointer', transform: 'rotate(-0.5deg)' }}
              >
                <img src={projectsData[0].heroImage} alt={projectsData[0].title} style={{ width: '100%', aspectRatio: '21/9', objectFit: 'cover', border: '1px solid #ddd', marginBottom: '40px' }} />
                
                <h3 className={styles.displayTitle} style={{ fontSize: '5rem', marginBottom: '15px' }}>{projectsData[0].title}</h3>
                <span className={styles.handwrittenAccent} style={{ fontSize: '1.8rem' }}>{projectsData[0].projectType}</span>
                
                <p className={styles.bodyText} style={{ marginTop: '30px', fontSize: '1.4rem', maxWidth: '900px' }}>{projectsData[0].summary}</p>
                
                <div className={styles.projectActions}>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/work/${projectsData[0].slug}`); }} className={styles.paperLabel}>View Case Study</button>
                  <a href={projectsData[0].liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={styles.paperLabel}>Live Site</a>
                  <a href={projectsData[0].liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className={styles.paperLabel}>GitHub</a>
                </div>
              </motion.div>
            )}

            {/* The secondary projects dynamically mapped to staggered CSS grid classes */}
            {projectsData.slice(1).map((project, idx) => {
              const classMap = [styles.projectCard2, styles.projectCard3, styles.projectCard4, styles.projectCard5];
              const gridClass = classMap[idx] || styles.projectCard5;
              const rotation = idx % 2 === 0 ? 1.5 : -1.5;

              return (
                <motion.div 
                  key={project.slug} 
                  className={`${styles.smallPolaroid} ${gridClass} ${styles.paperLift}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  onClick={() => navigate(`/work/${project.slug}`)}
                  style={{ cursor: 'pointer', transform: `rotate(${rotation}deg)` }}
                >
                  <img src={project.heroImage} alt={project.title} className={styles.polaroidImage} loading="lazy" />
                  <div className={styles.hoverActions}>
                    <span className={styles.primaryCta} style={{ fontSize: '0.95rem', padding: '10px 20px' }}>Read Case Study</span>
                  </div>
                  <h3 className={styles.notebookHeading}>{project.title}</h3>
                  <p className={styles.bodyText} style={{ fontSize: '1.1rem', marginTop: '10px' }}>{project.summary}</p>
                </motion.div>
              );
            })}
          </div>

          <div className={styles.editorialTransition}>
            <p className={styles.bodyTextLight} style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Interested in how these systems were engineered?</p>
            <a href="#work" className={styles.editorialLink} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' })}}>View all case studies →</a>
          </div>
        </section>

        {/* ─── NON-OBJECT: CAPABILITIES SPREAD (How do they think?) ─── */}
        <section className={styles.capabilitiesSpread} id="services">
          <div className={styles.capIntro}>
            <h2 className={`${styles.displayTitle} ${styles.displayTitleLight}`} style={{ fontSize: '5rem', marginBottom: '40px' }}>CAPABILITIES</h2>
            <p className={styles.bodyTextLight}>
              I do not just write code; I architect systems. The goal is always to balance rapid feature delivery with long-term structural integrity. 
              Here is how I approach the core pillars of software engineering.
            </p>
          </div>
          
          <div className={styles.matrixGrid}>
            <div className={`${styles.matrixItem} ${styles.paperLift}`}>
              <h4 className={styles.notebookHeading} style={{ color: 'var(--white)' }}>Frontend Architecture</h4>
              <p className={styles.bodyTextLight}>
                SPA architecture prioritizing minimal bundle sizes, fluid micro-interactions (60fps), and scalable, token-driven component libraries.
              </p>
            </div>
            <div className={`${styles.matrixItem} ${styles.paperLift}`}>
              <h4 className={styles.notebookHeading} style={{ color: 'var(--white)' }}>Backend Engineering</h4>
              <p className={styles.bodyTextLight}>
                High-concurrency asynchronous endpoints (FastAPI/Node), rigorous REST principles, and relational schema optimization (PostgreSQL).
              </p>
            </div>
            <div className={`${styles.matrixItem} ${styles.paperLift}`} style={{ borderLeftColor: 'var(--red-marker)' }}>
              <h4 className={styles.notebookHeading} style={{ color: 'var(--white)' }}>AI & RAG Systems</h4>
              <p className={styles.bodyTextLight}>
                Designing privacy-first local semantic pipelines (FAISS/Milvus), cross-encoder reranking, and deterministic prompt engineering.
              </p>
            </div>
            <div className={`${styles.matrixItem} ${styles.paperLift}`} style={{ borderLeftColor: 'var(--red-marker)' }}>
              <h4 className={styles.notebookHeading} style={{ color: 'var(--white)' }}>Edge Deployment</h4>
              <p className={styles.bodyTextLight}>
                Model quantization (INT8/4-bit), TensorRT C++ compilation, and latency-deterministic hardware deployment.
              </p>
            </div>
          </div>
          
          <div style={{ maxWidth: '1600px', margin: '80px auto 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
             <p className={styles.bodyTextLight} style={{ marginBottom: '20px', fontSize: '1.4rem' }}>Need something similar?</p>
             <a href="#contact" className={styles.primaryCtaLight}>Discuss a project →</a>
          </div>
        </section>

        {/* ─── OBJECT 3: SKILLS BROADSHEET (What are they good at?) ─── */}
        <section className={styles.skillsSection} id="skills">
          <motion.div 
            className={`${styles.broadsheetPaper} ${styles.paperLift}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transform: 'rotate(0.5deg)' }}
          >
            <div className={styles.broadsheetHeader}>
              <div className={styles.headerTopMeta}>
                <span>ISSUE NO. 1</span>
                <span>TECHNICAL INVENTORY</span>
              </div>
              <h2 className={styles.displayTitle} style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', margin: '40px 0' }}>THE STACK</h2>
              <div className={styles.headerBottomMeta}>
                <span>JULY 2026</span>
                <span>VERIFIED TOOLS</span>
              </div>
            </div>

            <div className={styles.broadsheetGrid}>
              {[
                { name: "React / Vite", level: "UI STACK", desc: "Modular UI components and fast rendering." },
                { name: "Node / Python", level: "BACKEND", desc: "Robust API processing and asynchronous endpoints." },
                { name: "PostgreSQL / SQL", level: "DATABASE", desc: "Relational tables and high-speed data retrieval." },
                { name: "Framer Motion", level: "ANIMATION", desc: "Spring animations for fluid micro-interactions." },
                { name: "Google Gemini", level: "AI / LLM", desc: "Integrating reasoning models directly into pipelines." },
                { name: "Tailwind CSS", level: "STYLING", desc: "Utility classes for rapid, token-driven designs." }
              ].map((skill, idx) => (
                <div key={skill.name} className={styles.broadsheetArticle}>
                  <span className={styles.notebookHeading} style={{ fontSize: '1rem', color: '#555', display: 'block', marginBottom: '15px' }}>{skill.level}</span>
                  <h4 className={styles.notebookHeading} style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    {skill.name}
                  </h4>
                  <div style={{ marginBottom: '20px' }}>
                    {renderSkillIcon(skill.name)}
                  </div>
                  <p className={styles.bodyText} style={{ fontSize: '1.15rem' }}>{skill.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'right', marginTop: '60px', borderTop: '2px solid var(--black)', paddingTop: '20px' }}>
              <a href="#skills" className={styles.primaryCta} style={{ background: 'transparent', color: 'var(--black)' }}>Full Technical Stack →</a>
            </div>
          </motion.div>
        </section>

        {/* ─── OBJECT 4: PERSONNEL DOSSIER (Can I trust them?) ─── */}
        <section className={styles.aboutSection} id="about">
          <motion.div 
            className={`${styles.dossierFolder} ${styles.paperLift}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className={styles.folderTab}>DOSSIER</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <img src="/images/headshot.png" alt="Portrait of Armaan Choudhary" className={styles.dossierPhoto} loading="lazy" />
              <div>
                <span className={styles.handwrittenAccent} style={{ fontSize: '1.6rem' }}>Status: Active</span>
                <p className={styles.bodyText} style={{ marginTop: '15px', fontSize: '1.2rem' }}><strong>Base:</strong> Delhi NCR</p>
                <p className={styles.bodyText} style={{ fontSize: '1.2rem' }}><strong>Role:</strong> Software Engineer</p>
              </div>
            </div>

            <div>
              <h3 className={styles.displayTitle} style={{ fontSize: '4rem', marginTop: 0, marginBottom: '40px' }}>BACKGROUND</h3>
              
              <h4 className={styles.notebookHeading} style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px', letterSpacing: '1px' }}>BACKGROUND SUMMARY</h4>
              <p className={styles.bodyText} style={{ marginBottom: '35px', fontSize: '1.25rem', lineHeight: '1.6' }}>
                I am a Software Engineer bridging the gap between <motion.span className={styles.highlighterMark} initial={{ backgroundSize: '0% 100%' }} whileInView={{ backgroundSize: '100% 100%' }} transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }} viewport={{ once: true }}>scalable system architecture</motion.span> and fluid user interfaces. I build robust, high-performance web applications that prioritize both security and <motion.span className={styles.highlighterMark} initial={{ backgroundSize: '0% 100%' }} whileInView={{ backgroundSize: '100% 100%' }} transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }} viewport={{ once: true }}>developer experience</motion.span>.
              </p>
              
              <div style={{ borderLeft: '4px solid var(--black)', paddingLeft: '20px', marginBottom: '35px', marginLeft: '5px' }}>
                <p className={styles.bodyText} style={{ fontSize: '1.35rem', fontStyle: 'italic', fontWeight: '600', margin: 0, lineHeight: '1.5' }}>
                  "Great software should be fast for users and maintainable for developers. Performance isn't a feature—it's a requirement."
                </p>
              </div>

              <h4 className={styles.notebookHeading} style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px', letterSpacing: '1px' }}>ENGINEERING PHILOSOPHY</h4>
              <p className={styles.bodyText} style={{ marginBottom: '35px', fontSize: '1.25rem', lineHeight: '1.6' }}>
                My engineering approach is rooted in <motion.span className={styles.highlighterMark} initial={{ backgroundSize: '0% 100%' }} whileInView={{ backgroundSize: '100% 100%' }} transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }} viewport={{ once: true }}>maintainability</motion.span> and structural integrity. Daily operations involve architecting <span style={{ color: 'var(--blue-ink)', fontWeight: 'bold' }}>React</span>-driven frontends, engineering high-concurrency <span style={{ color: 'var(--blue-ink)', fontWeight: 'bold' }}>RESTful APIs</span>, and integrating deterministic <span style={{ color: 'var(--blue-ink)', fontWeight: 'bold' }}>Edge AI</span> models with strict adherence to web standards.
              </p>

              <h4 className={styles.notebookHeading} style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px', letterSpacing: '1px' }}>CURRENT INTERESTS</h4>
              <p className={styles.bodyText} style={{ marginBottom: '45px', fontSize: '1.25rem', lineHeight: '1.6' }}>
                When I'm not writing production code, I'm likely profiling <span style={{ color: 'var(--blue-ink)', fontWeight: 'bold' }}>Linux</span> kernels, experimenting with <motion.span className={styles.highlighterMark} initial={{ backgroundSize: '0% 100%' }} whileInView={{ backgroundSize: '100% 100%' }} transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }} viewport={{ once: true }}>hardware quantization</motion.span>, or restoring <span style={{ color: 'var(--blue-ink)', fontWeight: 'bold' }}>vintage digital cameras</span>.
              </p>

              <h4 className={styles.notebookHeading} style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px', letterSpacing: '1px' }}>ATTACHMENTS</h4>
              <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
                <a href="/Resume.pdf" target="_blank" rel="noreferrer" className={styles.utilityLink}>📎 Resume.pdf</a>
                <a href="https://github.com/armaan-choudhary" target="_blank" rel="noreferrer" className={styles.utilityLink}>📎 GitHub</a>
                <a href="#contact" className={styles.utilityLink}>📎 Contact</a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── OBJECT 5: INTAKE SHEET (Let's work together) ─── */}
        <section className={styles.contactSection} id="contact">
          <motion.div 
            className={`${styles.intakeSheet} ${styles.paperLift}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ transform: 'rotate(-0.5deg)' }}
          >
            <div className={styles.intakeHeader}>
              <h2 className={styles.displayTitle} style={{ fontSize: '4.5rem', marginBottom: '10px' }}>PROJECT INTAKE</h2>
              <p className={styles.bodyText}>Available for full-time roles, freelance engagements and technical consulting. Typically responding within 24–48 hours.</p>
            </div>
            
            {formSubmitStatus === 'success' ? (
              <div style={{ padding: '40px 0' }}>
                <h3 className={styles.handwrittenAccent} style={{ color: 'var(--red-marker)', fontSize: '2.5rem', marginBottom: '20px' }}>TRANSMISSION RECEIVED</h3>
                <p className={styles.bodyText}>Your message has been filed. I will review it shortly.</p>
                <button className={styles.btnSubmit} onClick={() => setFormSubmitStatus(null)}>NEW INQUIRY</button>
              </div>
            ) : (
              <form className={styles.contactForm} onSubmit={handleFormSubmit}>
                <input type="text" name="_honeypot" style={{ display: 'none' }} />
                
                <div className={styles.intakeField}>
                  <label className={styles.intakeLabel}>Name / Organization</label>
                  <input 
                    type="text" name="name" 
                    className={styles.intakeInput} 
                    value={formData.name} onChange={handleFormChange} 
                  />
                </div>
                
                <div className={styles.intakeField}>
                  <label className={styles.intakeLabel}>Return Email Address</label>
                  <input 
                    type="email" name="email" 
                    className={styles.intakeInput} 
                    value={formData.email} onChange={handleFormChange} 
                  />
                </div>
                
                <div className={styles.intakeField}>
                  <label className={styles.intakeLabel}>Project Details / Message</label>
                  <input 
                    type="text" name="message" 
                    className={styles.intakeInput} 
                    value={formData.message} onChange={handleFormChange} 
                  />
                </div>
                
                <button type="submit" className={styles.btnSubmit}>
                  {formSubmitStatus === 'submitting' ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </motion.div>
        </section>

      </div>
    </div>
  );
}
