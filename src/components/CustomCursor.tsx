import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import "./Customcursor.css";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!(target.closest('a, button, [role="button"]')));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setTrail(t => ({
        x: t.x + (pos.x - t.x) * 0.15,
        y: t.y + (pos.y - t.y) * 0.15,
      }));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ left: pos.x, top: pos.y }}
        animate={{ scale: clicking ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
      />
      <div
        className={`cursor-ring ${hovering ? 'hovering' : ''} ${clicking ? 'clicking' : ''}`}
        style={{ left: trail.x, top: trail.y }}
      />
    </>
  );
}
