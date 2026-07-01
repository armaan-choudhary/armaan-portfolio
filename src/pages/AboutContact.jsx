import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button.jsx'
import Sticker from '../components/ui/Sticker.jsx'
import Tape from '../components/ui/Tape.jsx'
import Divider from '../components/ui/Divider.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import skillsData from '../data/skills.json'
import styles from './AboutContact.module.css'

export default function AboutContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', _honeypot: '' })
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | 'submitting'

  // Group skills by category
  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill.name)
    return acc
  }, {})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'What should I call you?'
    if (!formData.email.trim()) {
      newErrors.email = 'Where can I reply?'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'That email looks a bit odd'
    }
    if (!formData.message.trim()) newErrors.message = 'Leave a word or two!'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Check honeypot
    if (formData._honeypot) {
      // Treat as spam success silently
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '', _honeypot: '' })
      return
    }

    // 2. Validate
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // 3. Submit
    setSubmitStatus('submitting')
    try {
      // Simulate submission to Formspree/Netlify
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '', _honeypot: '' })
    } catch (err) {
      setSubmitStatus('error')
    }
  }

  return (
    <div className={styles.aboutPage}>
      {/* 1. Bio Section */}
      <section className={styles.bioSection}>
        <div className="container">
          <div className={styles.bioGrid}>
            <div className={styles.bioContent}>
              <SectionTitle rotate={-2} annotation="My origin story, brief and unpolished">
                The Story So Far...
              </SectionTitle>
              <div className={styles.bioPaper}>
                <p className={styles.bioText}>
                  I'm <strong>Armaan Choudhary</strong>, a creative developer living inside terminal prompts and vector layouts. I make things for the web that feel heavy, raw, and full of texture.
                </p>
                <p className={styles.bioText}>
                  My journey started in graphic zines and punk show posters. I loved the tangible quality of physical layouts — photocopier artifacts, misalignment, paper grain, and thick felt pens. When I learned to program, I was bored by the sterile, perfectly-aligned 'modern' web. I wanted to drag that raw, physical aesthetic into the browser.
                </p>
                <p className={styles.bioText}>
                  Today, I build robust, functional software wrapped in distinct, high-impact visuals. I believe that a portfolio shouldn't just list your credentials — it should make you feel something.
                </p>
                <div className={styles.bioActions}>
                  <Button href="/resume.pdf" variant="yellow">Download Resume (PDF)</Button>
                </div>
              </div>
            </div>

            <div className={styles.bioVisual}>
              <motion.div
                className={styles.stickerStack}
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <div className={`${styles.paperNote} ${styles.noteYellow}`}>
                  <Tape rotate={5} className={styles.noteTape} />
                  <span className={`${styles.noteHeading} handwritten`}>Self-declared:</span>
                  <p className={styles.noteText}>"I write code that refuses to sit still, in layouts that hate symmetry."</p>
                </div>

                <div className={`${styles.paperNote} ${styles.noteWhite}`}>
                  <Tape rotate={-4} className={styles.noteTape} />
                  <span className={`${styles.noteHeading} handwritten`}>Coffee Counter:</span>
                  <p className={styles.noteText}>9,400+ cups. 0 regrets.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Divider variant="block" />

      {/* 2. My Toolbox Section */}
      <section className={styles.toolboxSection}>
        <div className="container">
          <div className={styles.toolboxHeader}>
            <SectionTitle rotate={1} annotation="The tools I break on a daily basis">
              My Toolbox
            </SectionTitle>
          </div>

          <div className={styles.toolboxGrid}>
            {Object.entries(groupedSkills).map(([category, skills], catIndex) => {
              const rotateDeg = catIndex % 2 === 0 ? -1 : 1
              return (
                <div
                  key={category}
                  className={styles.toolCategoryCard}
                  style={{ '--rotate': `${rotateDeg}deg` }}
                >
                  <h3 className={styles.categoryTitle}>{category}</h3>
                  <Divider variant="dashed" className={styles.cardDivider} />
                  <div className={styles.badgeCloud}>
                    {skills.map((skill, index) => {
                      // Small rotation adjustments for stickers
                      const rot = (index % 5) - 2
                      return (
                        <span
                          key={skill}
                          className={styles.toolboxBadge}
                          style={{ '--rotate': `${rot}deg` }}
                        >
                          {skill}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Divider variant="dashed" />

      {/* 3. Say Hello Form Section */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <SectionTitle rotate={-1} annotation="Got a vision? Let's paint it.">
                Say Hello
              </SectionTitle>
              <p className={styles.contactDesc}>
                Whether you want to build a brutalist e-commerce site, need a creative developer to help design shaders, or just want to tell me my layout makes your eyes water — my inbox is wide open.
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.detailItem}>
                  <span className={`${styles.detailLabel} handwritten`}>Direct Mail:</span>
                  <a href="mailto:hello@armaan.dev" className={styles.detailValue}>hello@armaan.dev</a>
                </div>
                <div className={styles.detailItem}>
                  <span className={`${styles.detailLabel} handwritten`}>Carrier Pigeon / Location:</span>
                  <span className={styles.detailValue}>Vancouver, BC (Pacific Time)</span>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              <div className={styles.formCard}>
                <Tape rotate={-3} className={styles.formTape} />
                <h3 className={styles.formHeader}>TRANSMIT A MESSAGE</h3>

                {submitStatus === 'success' ? (
                  <motion.div
                    className={styles.statusBox}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Sticker rotate={-4} color="yellow">TRANSMISSION SENT</Sticker>
                    <h4 className={styles.statusHeading}>Message Received!</h4>
                    <p className={styles.statusText}>
                      Thanks for dropping by. I will dig through the tape and get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitStatus(null)} variant="primary">Send Another</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Honeypot field for anti-spam */}
                    <input
                      type="text"
                      name="_honeypot"
                      value={formData._honeypot}
                      onChange={handleChange}
                      className={styles.honeypot}
                      tabIndex="-1"
                      autoComplete="off"
                    />

                    <div className={styles.field}>
                      <label htmlFor="name" className={styles.label}>YOUR NAME</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        placeholder="e.g. Jane Doe"
                        disabled={submitStatus === 'submitting'}
                      />
                      {errors.name && <span className={`${styles.errorText} handwritten`}>{errors.name}</span>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="email" className={styles.label}>YOUR EMAIL</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="e.g. jane@example.com"
                        disabled={submitStatus === 'submitting'}
                      />
                      {errors.email && <span className={`${styles.errorText} handwritten`}>{errors.email}</span>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="message" className={styles.label}>THE DETAILS</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                        placeholder="Tell me about your project, your timeline, or your favorite synthesizer..."
                        disabled={submitStatus === 'submitting'}
                      />
                      {errors.message && <span className={`${styles.errorText} handwritten`}>{errors.message}</span>}
                    </div>

                    <div className={styles.submitRow}>
                      <Button type="submit" variant="yellow" disabled={submitStatus === 'submitting'}>
                        {submitStatus === 'submitting' ? 'TRANSMITTING...' : 'SEND MESSAGE →'}
                      </Button>
                    </div>

                    {submitStatus === 'error' && (
                      <p className={`${styles.submitErrorText} handwritten`}>
                        * Transmission failed. Please try again or email me directly.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
