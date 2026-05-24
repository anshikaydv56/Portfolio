import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code as Code2, Database, Globe, Smartphone, ChevronDown, FileText, Cpu } from 'lucide-react';
import './About.css';

const highlights = [
  { icon: Code2, label: 'Frontend', desc: 'React, Vue, TypeScript — pixel-perfect UIs' },
  { icon: Database, label: 'Backend', desc: 'Node.js, PostgreSQL, Redis — scalable APIs' },
  { icon: Globe, label: 'Cloud', desc: 'AWS, GCP, Docker — production infra' },
  { icon: Smartphone, label: 'Mobile', desc: 'React Native — cross-platform apps' },
];

export default function About() {
  // TypeScript ki safely targetting ke liye HTMLElement add kiya hai
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  
  // Dropdown ko open aur close karne ke liye State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Agar user dropdown ke bahaar kahin bhi click kare toh menu band ho jaye
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* Visual Section (Left) */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="about-img-wrapper">
              <img
                src="https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Developer at work"
                className="about-img"
              />
              <div className="about-img-ring" />
              <div className="about-img-ring ring-2" />
              <div className="about-card-floating code-card">
                <span className="code-line"><span className="c-blue">const</span> <span className="c-cyan">dev</span> = &#123;</span>
                <span className="code-line ml">name: <span className="c-green">'Anshika'</span>,</span>
                <span className="code-line ml">focus: <span className="c-amber">['FullStack', 'AI_Automation']</span></span>
                <span className="code-line">&#125;</span>
              </div>
              <div className="about-card-floating exp-card">
                <span className="exp-num gradient-text">1+</span>
                <span className="exp-label">Years of<br />Experience</span>
              </div>
            </div>
          </motion.div>

          {/* Text Section (Right) */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="section-label">Who I Am</p>
            <h2 className="section-title">
              Building the Future,<br />
              <span className="gradient-text">One Line at a Time</span>
            </h2>
            <p className="about-desc">
              I'm Anshika Yadav, a software developer specializing in Full-Stack Web Development
              and AI Automation workflows. I thrive at the intersection of technology and creativity,
              turning complex automation problems and designs into elegant, production-ready solutions.
            </p>
            <p className="about-desc">
              From architecting backend structures with Node.js to engineering intelligent multi-tier
              n8n automation pipelines and LLM integrations, I bring an automated, efficient perspective to modern software development.
            </p>

            <div className="about-highlights">
              {highlights.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  className="highlight-item card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="highlight-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="highlight-label">{label}</p>
                    <p className="highlight-desc">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Functional Category Dropdown Container */}
            <div className="resume-dropdown-container" ref={dropdownRef}>
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="btn-primary resume-trigger-btn"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <span>Download resume </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="resume-dropdown-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Link 1: Full Stack Resume */}
                    <a
                      href="/resume1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FileText size={16} className="item-icon" />
                      <div className="item-text">
                        <span className="item-title">Full Stack Developer</span>
                        <span className="item-subtitle">MERN Stack, React.js, APIs</span>
                      </div>
                    </a>
                    
                    <div className="dropdown-divider"></div>
                    
                    {/* Link 2: AI Automation Resume */}
                    <a
                      href="/resume2.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Cpu size={16} className="item-icon" />
                      <div className="item-text">
                        <span className="item-title">AI Automation Engineer</span>
                        <span className="item-subtitle">n8n, Agentic Workflows, LLMs</span>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}