import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FloatingElements.module.css';

const FloatingOrb = ({ size, color, position, delay, duration, index }) => {
  return (
    <motion.div
      className={`${styles.floatingOrb} ${styles[color]} ${styles[size]}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    />
  );
};

const FloatingSquare = ({ size, color, position, delay, duration, index }) => {
  return (
    <motion.div
      className={`${styles.floatingSquare} ${styles[color]} ${styles[size]}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
      animate={{
        y: [-15, 15, -15],
        x: [10, -10, 10],
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 0.9, 1.1, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
    />
  );
};

const FloatingTriangle = ({ size, color, position, delay, duration, index }) => {
  return (
    <motion.div
      className={`${styles.floatingTriangle} ${styles[color]} ${styles[size]}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
      animate={{
        y: [-25, 25, -25],
        x: [-5, 15, -5],
        rotate: [0, 120, 240, 360],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: 60 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
    />
  );
};

const FloatingDiamond = ({ size, color, position, delay, duration, index }) => {
  return (
    <motion.div
      className={`${styles.floatingDiamond} ${styles[color]} ${styles[size]}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
      animate={{
        y: [-18, 18, -18],
        x: [12, -8, 12],
        rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
        scale: [1, 1.15, 0.85, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      initial={{ opacity: 0, scale: 0.6, rotate: 45 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 45 }}
      viewport={{ once: true }}
    />
  );
};

const FloatingHexagon = ({ size, color, position, delay, duration, index }) => {
  return (
    <motion.div
      className={`${styles.floatingHexagon} ${styles[color]} ${styles[size]}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
      animate={{
        y: [-22, 22, -22],
        x: [-8, 8, -8],
        rotate: [0, 60, 120, 180, 240, 300, 360],
        scale: [1, 0.9, 1.1, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    />
  );
};

const FloatingRing = ({ size, color, position, delay, duration, index }) => {
  return (
    <motion.div
      className={`${styles.floatingRing} ${styles[color]} ${styles[size]}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }}
      animate={{
        y: [-16, 16, -16],
        x: [8, -12, 8],
        rotate: [0, 180, 360],
        scale: [1, 1.3, 0.7, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    />
  );
};

const FloatingElements = ({ section = 'global', density = 'medium' }) => {
  const [elements, setElements] = useState([]);

  const shapes = [FloatingOrb, FloatingSquare, FloatingTriangle, FloatingDiamond, FloatingHexagon, FloatingRing];
  const colors = ['primary', 'secondary', 'accent', 'warm', 'emerald', 'amber'];
  const sizes = ['small', 'medium', 'large'];

  const densityConfig = {
    light: 8,
    medium: 12,
    dense: 16,
  };

  const generateRandomPosition = (index, total) => {
    const positions = [
      { top: '10%', left: '5%' },
      { top: '20%', right: '8%' },
      { top: '35%', left: '12%' },
      { top: '45%', right: '15%' },
      { top: '60%', left: '8%' },
      { top: '70%', right: '12%' },
      { top: '80%', left: '15%' },
      { bottom: '15%', right: '5%' },
      { bottom: '25%', left: '10%' },
      { bottom: '35%', right: '20%' },
      { bottom: '45%', left: '18%' },
      { bottom: '55%', right: '10%' },
      { top: '15%', left: '85%' },
      { top: '40%', left: '90%' },
      { bottom: '20%', left: '88%' },
      { bottom: '50%', left: '92%' },
    ];
    
    return positions[index % positions.length];
  };

  useEffect(() => {
    const elementCount = densityConfig[density];
    const newElements = [];

    for (let i = 0; i < elementCount; i++) {
      const ShapeComponent = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const position = generateRandomPosition(i, elementCount);
      const delay = Math.random() * 3;
      const duration = 8 + Math.random() * 12; // 8-20 seconds

      newElements.push({
        id: i,
        Component: ShapeComponent,
        color,
        size,
        position,
        delay,
        duration,
      });
    }

    setElements(newElements);
  }, [density]);

  return (
    <div className={`${styles.floatingContainer} ${styles[section]}`}>
      {elements.map((element) => (
        <element.Component
          key={element.id}
          size={element.size}
          color={element.color}
          position={element.position}
          delay={element.delay}
          duration={element.duration}
          index={element.id}
        />
      ))}
    </div>
  );
};

export default FloatingElements;