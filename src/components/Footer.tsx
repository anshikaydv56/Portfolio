import { motion } from 'framer-motion';
import { Code as Code2, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <motion.div
          className="footer-logo"
          whileHover={{ scale: 1.05 }}
        >
          <Code2 size={20} />
          <span>A<span className="logo-accent">.Y</span></span>
        </motion.div>

        <p className="footer-copy">
          Built with <Heart size={12} className="heart" /> using React, Three.js & Framer Motion
        </p>

        <p className="footer-year">© 2026 Anshika Yadav. All rights reserved.</p>
      </div>
    </footer>
  );
}
