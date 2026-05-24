import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import "./Skills.css";

const skillCategories = [
  {
    category: 'Frontend',
    color: '#3b82f6',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Vue.js', level: 75 },
      { name: 'CSS / Tailwind', level: 92 },
      { name: 'Three.js / WebGL', level: 70 },
    ],
  },
  {
    category: 'Backend',
    color: '#06b6d4',
    skills: [
      { name: 'Node.js / Express', level: 92 },
      { name: 'Python / FastAPI', level: 80 },
      { name: 'GraphQL', level: 78 },
      { name: 'REST APIs', level: 95 },
      { name: 'WebSockets', level: 82 },
    ],
  },
  {
    category: 'Database & Cloud',
    color: '#10b981',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 75 },
      { name: 'AWS / GCP', level: 78 },
      { name: 'Docker / K8s', level: 72 },
    ],
  },
];

const techBadges = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'AWS', 'GraphQL', 'Prisma', 'Tailwind',
  'Git', 'Linux', 'Figma', 'Jest', 'Cypress',
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I Work With</p>
          <h2 className="section-title">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-desc">
            A broad toolkit built through years of solving real-world engineering challenges.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map(({ category, color, skills }, catIdx) => (
            <motion.div
              key={category}
              className="card skills-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.15, duration: 0.6 }}
            >
              <div className="skills-card-header" style={{ borderColor: color + '40' }}>
                <span className="skills-card-dot" style={{ background: color }} />
                <h3 className="skills-card-title">{category}</h3>
              </div>
              <div className="skill-bars">
                {skills.map(({ name, level }, i) => (
                  <SkillBar key={name} name={name} level={level} color={color} delay={catIdx * 0.15 + i * 0.1} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="tech-badges"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="tech-badges-label">Also familiar with</p>
          <div className="badge-list">
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                className="tech-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
