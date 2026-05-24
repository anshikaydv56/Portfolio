import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, Star, GitFork } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'CureAsap – Emergency Rescue System',
    desc: 'A real-time emergency response platform connecting citizens, hospitals, and drivers with live tracking, instant emergency request updates, and responsive dashboards for fast rescue coordination.',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React.js', 'Supabase', 'WebSockets', 'Tailwind CSS', 'Geolocation API'],
    category: 'fullstack',
    stars: 245,
    forks: 58,
    color: '#ef4444',
    live: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'AI Automation Workflow Project',
    desc: 'Built intelligent automation workflows using n8n and APIs to automate repetitive tasks, process JSON data, and improve workflow efficiency for daily operations.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['n8n', 'APIs', 'JSON', 'Automation'],
    category: 'backend',
    stars: 180,
    forks: 42,
    color: '#06b6d4',
    live: '#',
    github: '#',
  },
  {
     id: 3,
    title: 'Crafshi – E-commerce Platform',
    desc: 'A responsive full-stack e-commerce platform with reusable UI components, dynamic product display, REST API integration, and clean responsive design.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    category: 'fullstack',
    stars: 210,
    forks: 49,
    color: '#10b981',
    live: '#',
    github: '#',
  },
  {
     id: 4,
    title: 'Hospital Management Dashboard',
    desc: 'Developed a responsive hospital management dashboard for handling beds, drivers, and emergency requests with structured layouts and better operational visibility.',
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React.js', 'Tailwind CSS'],
    category: 'frontend',
    stars: 156,
    forks: 31,
    color: '#8b5cf6',
    live: '#',
    github: '#',
  },
  {
    id: 5,
  title: 'Digital Clock Web App',
  desc: 'A modern digital clock web application displaying real-time date and time with responsive UI, smooth updates, and clean minimalist design.',
  image: 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags: ['HTML', 'CSS', 'JavaScript'],
  category: 'frontend',
  stars: 94,
  forks: 18,
  color: '#f59e0b',
  live: '#',
  github: '#',
  },
  {
    id: 6,
    title: 'Design System',
    desc: 'Battle-tested React component library with 80+ components, full accessibility support, dark mode, and first-class TypeScript typings.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'TypeScript', 'Storybook', 'CSS Modules'],
    category: 'frontend',
    stars: 445,
    forks: 98,
    color: '#8b5cf6',
    live: '#',
    github: '#',
  },
];

const filters = ['all', 'fullstack', 'frontend', 'backend'];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = projects.filter(p => activeFilter === 'all' || p.category === activeFilter);

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-desc">
            A selection of projects I've shipped — from side experiments to production systems.
          </p>
        </motion.div>

        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          <div className="projects-grid">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className="project-card card"
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ '--project-color': project.color } as React.CSSProperties}
              >
                <div className="project-image-wrap">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <a href={project.live} className="project-link-btn" aria-label="Live demo">
                      <ExternalLink size={18} />
                    </a>
                    <a href={project.github} className="project-link-btn" aria-label="GitHub">
                      <GitBranch size={18} />
                    </a>
                  </div>
                  <div className="project-color-bar" style={{ background: project.color }} />
                </div>
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-meta">
                    <span className="project-stat"><Star size={13} />{project.stars}</span>
                    <span className="project-stat"><GitFork size={13} />{project.forks}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
