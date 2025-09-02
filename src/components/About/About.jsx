import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 90, category: 'Backend' },
    { name: 'Jinja2', level: 88, category: 'Language' },
    { name: 'Python', level: 85, category: 'Language' },
    { name: 'PostgreSQL', level: 82, category: 'Database' },
    { name: 'AWS', level: 78, category: 'Cloud' },
     { name: 'Google Cloud Console', level: 78, category: 'Cloud' },
    { name: 'Docker', level: 80, category: 'DevOps' },
    { name: 'Django', level: 95, category: 'Backend' },
    { name: 'FastAPI', level: 83, category: 'API' },
  ];

const experience = [
  {
    year: '2023 - 2025',
    title: 'Full-Stack Projects',
    company: '',
    description: 'Built projects combining frontend, backend, and cloud. Focus on performance, scalability, and clean architecture.',
  },
  {
    year: '2022',
    title: 'Cloud & DevOps',
    company: '',
    description: 'Knowledge of AWS, GCP, and Azure. Familiar with Git, CI/CD pipelines, and Docker for deployment workflows.',
  },
  {
    year: '2021',
    title: 'Server-Side & Databases',
    company: '',
    description: 'Worked with MySQL, PostgreSQL, and MongoDB. Implemented authentication, session management, and data modeling.',
  },
  {
    year: '2020',
    title: 'Backend Development',
    company: '',
    description: 'Experience with Node.js, Express.js, Django, and Flask for creating scalable APIs and business logic.',
  },
  {
    year: '2019',
    title: 'Frontend Development',
    company: '',
    description: 'Skilled in HTML, CSS, JavaScript, React, Next.js, and Tailwind CSS for building modern, responsive UIs.',
  },
];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>About Me</h1>
          <div className={styles.titleAccent} />
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.leftColumn}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className={styles.bioCard} variants={itemVariants}>
              <h3 className={styles.bioTitle}>My Story</h3>
              <p className={styles.bioText}>
                I'm a passionate full-stack developer with over 5 years of experience 
                creating digital solutions that matter. My journey began with a curiosity 
                about how things work on the web, and it has evolved into a deep love for 
                crafting exceptional user experiences.
              </p>
              <p className={styles.bioText}>
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the 
                developer community through blog posts and mentoring.
              </p>
            </motion.div>

            <motion.div className={styles.experienceSection} variants={itemVariants}>
              <h3 className={styles.sectionTitle}>Experience</h3>
              <div className={styles.timeline}>
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    className={styles.timelineItem}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={styles.timelineMarker} />
                    <div className={styles.timelineContent}>
                      <span className={styles.year}>{exp.year}</span>
                      <h4 className={styles.jobTitle}>{exp.title}</h4>
                      <p className={styles.company}>{exp.company}</p>
                      <p className={styles.jobDescription}>{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.rightColumn}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className={styles.skillsSection} variants={itemVariants}>
              <h3 className={styles.sectionTitle}>Skills & Technologies</h3>
              <div className={styles.skillsGrid}>
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className={styles.skillItem}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillCategory}>{skill.category}</span>
                    </div>
                    <div className={styles.skillBar}>
                      <motion.div
                        className={styles.skillProgress}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.statsSection} variants={itemVariants}>
              <h3 className={styles.sectionTitle}>By the Numbers</h3>
              <div className={styles.statsGrid}>
                <motion.div 
                  className={styles.statItem}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className={styles.statNumber}>20+</span>
                  <span className={styles.statLabel}>Projects Completed</span>
                </motion.div>
                <motion.div 
                  className={styles.statItem}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className={styles.statNumber}>5+</span>
                  <span className={styles.statLabel}>Years Experience</span>
                </motion.div>
                <motion.div 
                  className={styles.statItem}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className={styles.statNumber}>15+</span>
                  <span className={styles.statLabel}>Happy Clients</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;