import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import './Experience.css';

const experiences = [

  {
   role: 'Full Stack Developer Intern',
    company: 'Labmentix',
    period: 'Sep 2025 – Mar 2026',
    location: 'Remote',
    type: 'Internship',
    desc: 'Worked on full-stack web applications using React.js, Node.js, and MongoDB. Contributed to scalable frontend-backend integration, API development, debugging, and performance optimization while collaborating in a fast-paced development environment.',
    achievements: [
      'Developed and maintained responsive full-stack applications',
      'Designed and integrated REST APIs for seamless data flow',
      'Resolved frontend and backend issues improving application stability',
      'Collaborated with team members on scalable project delivery',
    ],
    color: '#3b82f6',
    logo: '⚡',
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Bharat Economic Forum',
    period: 'Jul 2025 – Sep 2025',
    location: 'Remote',
    type: 'Internship',
    desc: 'Developed modern and responsive frontend interfaces while collaborating closely with design and development teams. Focused on UI consistency, bug fixing, and improving overall user experience.',
    achievements: [
      'Built responsive UI components using React.js and Tailwind CSS',
      'Identified and resolved 20+ UI bugs for improved stability',
      'Collaborated with cross-functional teams for accurate implementation',
      'Maintained project documentation and workflow tracking',
    ],
    color: '#06b6d4',
    logo: '✦',
  },
  
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section exp-section" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Career Path</p>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-desc">
            Shaped by impactful work at some of the world's best tech companies.
          </p>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="timeline-item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}60` }} />
              <div className="card timeline-card">
                <div className="timeline-card-header">
                  <div className="timeline-logo" style={{ background: exp.color + '20', borderColor: exp.color + '40', color: exp.color }}>
                    {exp.logo}
                  </div>
                  <div className="timeline-info">
                    <h3 className="timeline-role">{exp.role}</h3>
                    <p className="timeline-company">{exp.company}</p>
                  </div>
                  <span className={`timeline-type ${exp.type === 'Internship' ? 'intern' : ''}`}>{exp.type}</span>
                </div>
                <div className="timeline-meta">
                  <span><Calendar size={12} /> {exp.period}</span>
                  <span><MapPin size={12} /> {exp.location}</span>
                </div>
                <p className="timeline-desc">{exp.desc}</p>
                <ul className="timeline-achievements">
                  {exp.achievements.map((a) => (
                    <li key={a}>
                      <span style={{ color: exp.color }}>→</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          <div className="timeline-line" />
        </div>
      </div>
    </section>
  );
}
