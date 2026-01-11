import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import ProfileImage from '../ProfileImage/ProfileImage';
import styles from './Hero.module.css';

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.hero} ref={ref}>
      <div className={styles.background}>
        <div className={styles.floatingObjects}>
          <div className={styles.floatingOrb}></div>
          <div className={styles.floatingOrb}></div>
          <div className={styles.floatingOrb}></div>
          <div className={styles.floatingSquare}></div>
          <div className={styles.floatingSquare}></div>
          <div className={styles.floatingTriangle}></div>
        </div>
        <div className={styles.glassMorphCard}></div>
      </div>

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className={styles.heroLayout}>
          <motion.div className={styles.profileSection} variants={itemVariants}>
            <ProfileImage size="large" animated={true} />
          </motion.div>

          <motion.div className={styles.content} variants={itemVariants}>
            <motion.h1 className={styles.title}>
              <motion.span
                className={styles.greeting}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Hello, I'm
              </motion.span>
              <motion.span
                className={styles.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
              >
                Bhuwan Joshi
              </motion.span>
            </motion.h1>

            <motion.div
              className={styles.roleContainer}
              variants={itemVariants}
            >
              <motion.h2
                className={styles.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Full Stack Developer
              </motion.h2>
              <motion.div
                className={styles.roleAccent}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
              />
            </motion.div>

            <motion.p
              className={styles.description}
              variants={itemVariants}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              A passionate full-stack developer with 5+ years of experience crafting innovative 
              digital solutions. I specialize in building scalable web applications, cross-platform 
              mobile apps, and robust server-side architectures using modern technologies like 
              React, Node.js, Python, and cloud platforms. From concept to deployment, I bridge 
              the gap between design and technology to create exceptional user experiences that 
              drive real-world impact.
            </motion.p>

            <motion.div
              className={styles.actions}
              variants={itemVariants}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <motion.button
                className={styles.primaryButton}
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              
              <motion.a
                href="#contact"
                className={styles.secondaryButton}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;