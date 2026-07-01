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
  const [submitStatus, setSubmitStatus] = useState(null)

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

    if (formData._honeypot) {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '', _honeypot: '' })
      return
    }

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitStatus('submitting')
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '', _honeypot: '' })
    } catch (err) {
      setSubmitStatus('error')
    }
  }

  return (
    <div className={styles.aboutPage}>
      <section className={styles.bioSection}>
        <div className="container">
          <div className={styles.bioGrid}>
            <div className={styles.bioContent}>
              <SectionTitle rotate={-2} annotation="Professional background and focus">
                About Me
              </SectionTitle>
              <div className={styles.bioPaper}>
                <p className={styles.bioText}>
                  I'm <strong>Armaan</strong>, a <span className="highlight">creative developer</span> crafting <span className={styles.highlightBlue}>visually engaging, technically refined digital experiences</span>. I turn ideas into fast, interactive websites where thoughtful design meets clean, scalable code.
                </p>
                <p className={styles.bioText}>
                  My approach focuses on <span className={styles.highlightRed}>intuitive UX</span>, <span className={styles.highlightBlue}>smooth interactions</span>, and <span className="highlight">performance</span>. Every project is an opportunity to build something meaningful that looks great and works seamlessly.
                </p>
                <p className={styles.bioText}>
                  Outside of development, I explore <span className={styles.highlightBlue}>new design trends</span>, experiment with <span className="highlight">interactions</span>, and learn <span className={styles.highlightRed}>tools</span> to build better digital experiences.
                </p>
                <div className={styles.bioActions}>
                  <Button href="/resume.pdf" variant="yellow">View Resume (PDF)</Button>
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
                  <span className={`${styles.noteHeading} handwritten`}>Philosophy:</span>
                  <p className={styles.noteText}>"If it isn't broken, break it, figure out why it worked, then rebuild it cooler."</p>
                </div>

                <div className={`${styles.paperNote} ${styles.noteWhite}`}>
                  <Tape rotate={-4} className={styles.noteTape} />
                  <span className={`${styles.noteHeading} handwritten`}>Current Obsessions:</span>
                  <p className={styles.noteText}>Physics animations, generative art, and deleting legacy CSS.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Divider variant="block" />

      <section className={styles.toolboxSection}>
        <div className="container">
          <div className={styles.toolboxHeader}>
            <SectionTitle rotate={1} annotation="The technologies I use in production">
              Technical Toolbox
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

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <SectionTitle rotate={-1} annotation="Let's build something.">
                Contact
              </SectionTitle>
              <p className={styles.contactDesc}>
                Whether you need an interactive web experience, a robust web application, or creative technical development, I am available for new freelance opportunities.
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.detailItem}>
                  <span className={`${styles.detailLabel} handwritten`}>Email:</span>
                  <a href="mailto:hello@armaan.dev" className={styles.detailValue}>hello@armaan.dev</a>
                </div>
                <div className={styles.detailItem}>
                  <span className={`${styles.detailLabel} handwritten`}>Location:</span>
                  <span className={styles.detailValue}>Vancouver, BC (Pacific Time)</span>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              <div className={styles.formCard}>
                <Tape rotate={-3} className={styles.formTape} />
                <h3 className={styles.formHeader}>SEND A MESSAGE</h3>

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
                      <label htmlFor="message" className={styles.label}>MESSAGE</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                        placeholder="Tell me about your project or technical requirements..."
                        disabled={submitStatus === 'submitting'}
                      />
                      {errors.message && <span className={`${styles.errorText} handwritten`}>{errors.message}</span>}
                    </div>

                    <div className={styles.submitRow}>
                      <Button type="submit" variant="yellow" disabled={submitStatus === 'submitting'}>
                        {submitStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE →'}
                      </Button>
                    </div>

                    {submitStatus === 'error' && (
                      <p className={`${styles.submitErrorText} handwritten`}>
                        * Delivery failed. Please try again or email me directly.
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
