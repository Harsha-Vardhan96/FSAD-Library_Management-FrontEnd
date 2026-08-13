import React from 'react';
import { motion } from 'framer-motion';

const Particle = ({ delay, x, size, duration, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      backgroundColor: color,
      boxShadow: `0 0 ${size * 2}px ${color}`,
    }}
    initial={{ y: '105vh', opacity: 0 }}
    animate={{ y: '-5vh', opacity: [0, 0.8, 0.8, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'linear',
    }}
  />
);

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  delay: i * 0.6,
  x: Math.random() * 100,
  size: 3 + Math.random() * 5,
  duration: 8 + Math.random() * 4,
  color: ['rgba(129,140,248,0.6)', 'rgba(232,121,249,0.6)', 'rgba(56,189,248,0.6)', 'rgba(167,139,250,0.5)'][i % 4],
}));

export const AuthBackground = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </div>
  );
};

export default AuthBackground;
