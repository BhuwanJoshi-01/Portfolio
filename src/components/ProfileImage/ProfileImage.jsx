import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProfileImage.module.css';

const ProfileImage = ({ className = '', size = 'large', animated = true }) => {
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -30
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        delay: 0.5
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        delay: 1.5
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotateZ: [-1, 1, -1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className={`${styles.profileContainer} ${styles[size]} ${className}`}>
      {/* Animated background glow */}
      <motion.div 
        className={styles.backgroundGlow}
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />
      
      {/* Floating orbs around profile */}
      <motion.div 
        className={styles.floatingOrb1}
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div 
        className={styles.floatingOrb2}
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
      
      {/* Main profile image container */}
      <motion.div
        className={styles.imageWrapper}
        variants={animated ? imageVariants : {}}
        initial={animated ? "hidden" : false}
        animate={animated ? "visible" : false}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
      >
        {/* Glassmorphism frame */}
        <div className={styles.glassFrame}>
          <div className={styles.innerFrame}>
            <motion.img
              src="/profile_img.png"
              alt="Bhuwan Joshi - Full Stack Developer"
              className={styles.profileImage}
              variants={animated ? floatingVariants : {}}
              animate={animated ? "animate" : false}
            />
            
            {/* Gradient overlay */}
            <div className={styles.gradientOverlay} />
            
            {/* Shine effect */}
            <motion.div 
              className={styles.shineEffect}
              animate={{
                x: [-100, 300],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: 'easeInOut'
              }}
            />
          </div>
        </div>
        
        {/* Status indicator */}
        <motion.div 
          className={styles.statusIndicator}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className={styles.statusDot} />
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div 
        className={styles.decorativeRing}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      <motion.div 
        className={styles.decorativeRing2}
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
};

export default ProfileImage;