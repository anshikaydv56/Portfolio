import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Clock, Send, GitBranch, Layers, AtSign } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error'
  >('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      setStatus('sending');

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus('sent');

      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      formRef.current.reset();

      setTimeout(() => {
        setStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('EmailJS Error:', error);

      setStatus('error');

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'anshikaydv06@gmail.com',
      href: 'mailto:anshikaydv06@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Shikohabad, Uttar Pradesh, India',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Availability',
      value: 'Available for Internships & Freelance',
      href: '#',
    },
  ];

  const socials = [
    {
      icon: GitBranch,
      href: 'https://github.com/anshikaydv56',
      label: 'GitHub',
    },
    {
      icon: Layers,
      href: 'https://www.linkedin.com/in/anshika-yadav-654aa133a/',
      label: 'LinkedIn',
    },
    {
      icon: AtSign,
      href: 'mailto:anshikaydv06@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <section
      className="section contact-section"
      id="contact"
      ref={sectionRef}
    >
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Let's Talk</p>

          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>

          <p className="section-desc">
            I&apos;m open to internships, freelance opportunities, and
            collaborations in web development, full-stack applications,
            and AI automation projects.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="card info-card">
              <h3 className="info-card-title">
                Contact Information
              </h3>

              <div className="info-items">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="info-item"
                  >
                    <div className="info-icon">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="info-label">{label}</p>
                      <p className="info-value">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="contact-socials">
                <p className="socials-label">Follow Me</p>

                <div className="socials-row">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="contact-social-link"
                      aria-label={label}
                      target={
                        href.startsWith('http')
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="availability-badge">
                <span className="avail-dot" />
                <span>
                  Available for internships & freelance projects
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form
              ref={formRef}
              className="card contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>

                  <input
                    id="name"
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>

                  <input
                    id="email"
                    type="email"
                    name="user_email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Project Collaboration"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subject: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    Sending...
                    <span className="spinner" />
                  </>
                ) : status === 'sent' ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>

              {status === 'sent' && (
                <motion.p
                  className="success-msg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  className="error-msg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}