import React, { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

/**
 * Animated Gradient Text Component
 */
export function GradientText({
  children,
  className = '',
  colors = ['#818cf8', '#e879f9', '#38bdf8'],
  animationSpeed = 8,
}) {
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);

  useAnimationFrame((_, delta) => {
    elapsedRef.current += delta / 1000;
    progress.set((elapsedRef.current % animationSpeed) / animationSpeed);
  });

  const background = useTransform(progress, (p) => {
    const angle = Math.floor(p * 360);
    return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  });

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{ background, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
    >
      {children}
    </motion.span>
  );
}

export default GradientText;
