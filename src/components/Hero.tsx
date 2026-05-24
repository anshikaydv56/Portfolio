import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, GitBranch, Layers, AtSign, Mail } from 'lucide-react';
import ParticleField from './ParticleField';
import './Hero.css';

const roles = ['Full Stack Developer', 'React Specialist', 'Node.js Engineer', 'Cloud Architect', 'UI/UX Enthusiast'];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (!deleting) {
      if (charIndex < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentRole.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentRole.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 35);
      } else {
        setDeleting(false);
        setRoleIndex((r) => (r + 1) % roles.length);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [charIndex, deleting, roleIndex]);

  const socials = [
    { icon: GitBranch, href: '#', label: 'GitHub' },
    { icon: Layers, href: '#', label: 'LinkedIn' },
    { icon: AtSign, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <section className="hero" id="hero">
      <div className="hero-canvas">
        <ParticleField />
      </div>
      <div className="hero-overlay" />

      <div className="hero-content container">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="badge-dot" />
          <span>Available for opportunities</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Hi, I'm <span className="gradient-text">Anshika Yadav</span>
        </motion.h1>

        <motion.div
          className="hero-role"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="role-prefix">I'm a </span>
          <span className="role-text">{displayText}<span className="cursor-blink">|</span></span>
        </motion.div>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          I build scalable web applications with modern technologies. Passionate about
          creating exceptional digital experiences that merge performance with elegant design.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <a href="#projects" className="btn-primary">
            View My Work
            <ArrowDown size={16} />
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} className="social-link" aria-label={label}>
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {[
            { value: '9', label: 'Months Experience' },
            { value: '10+', label: 'Projects Shipped' },
            { value: '20+', label: 'Happy Clients' },
            { value: '10+', label: 'Open Source' },
          ].map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <span className="stat-value gradient-text">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="hero-scroll"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
}
