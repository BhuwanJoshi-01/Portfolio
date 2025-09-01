import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from './Projects.module.css';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState(null);

const projects = [
  {
    id: 1,
    title: 'Forgex - Developer Learning Platform',
    description: 'A full-stack learning and mentoring platform for developers. Includes interactive resources, mentorship features, and modern responsive UI.',
  image: '/forgexdev.png', 
    imageAlt: 'Forgex developer learning and mentoring platform',
    technologies: ['Jinja', 'FastAPI', 'PostgreSQL', 'Django', 'Docker', 'Monaco Editor', 'WebRTC', 'WebSocket', 'Tailwind CSS'],
    liveUrl: 'https://forgexdev.me',
    githubUrl: 'https://forgexdev.me', // not open source
    category: 'Full Stack',
    featured: true,
  },
  {
    id: 2,
    title: 'Earthly Wonders',
    description: 'Frontend project focused on nature. Showcases responsive design and creative layouts inspired by the environment.',
    image: '/Earthly_wonders.png', 
    imageAlt: 'Nature themed website Earthly Wonders project',
    technologies: ['HTML', 'CSS'],
    liveUrl: 'https://github.com/BhuwanJoshi-01/WEB_Project_Nature',
    githubUrl: 'https://github.com/BhuwanJoshi-01/WEB_Project_Nature',
    category: 'Frontend',
    featured: false,
  },
  {
    id: 3,
    title: 'KodeSQL',
    description: 'Full-stack web app for students to learn and solve SQL problems. Features challenge solving, and an interactive interface.',
    image: '/kodesql.png', 
    imageAlt: 'KodeSQL SQL learning and practice platform',
    technologies: ['Jinja', 'Django', 'PostgreSQL', 'Monaco Editor', 'MySQL'],
    liveUrl: 'https://kodesql.in',
    githubUrl: 'https://kodesql.in', // not public
    category: 'Full Stack',
    featured: true,
  },

  {
  id: 4,
  title: 'Smart Refrigerator',
  description: 'An Arduino-based smart refrigerator project.',
  image: '/smart_refriedgerator.png', 
  imageAlt: 'Arduino Smart Refrigerator',
  technologies: ['C++', 'Arduino', 'Sensors'],
  liveUrl: 'https://www.tinkercad.com/things/j1lbvtGtLyl-smart-refriedgerator',
  githubUrl: 'https://github.com/BhuwanJoshi-01/Smart_Refrigerator_Using_Arduino', // not public
  category: 'Arduino',
  featured: false,
  },
];


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
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className={styles.projects} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            A showcase of my recent work and creative solutions
          </p>
          <div className={styles.titleAccent} />
        </motion.div>

        <motion.div
          className={styles.projectsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openProject(project)}
              data-cursor="project"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
            >
              <div className={styles.imageContainer}>
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className={styles.projectImage}
                  style={{ width: '100%', height: '250px' }}
                />
                <div className={styles.imageOverlay}>
                  <motion.button
                    className={styles.viewButton}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Details
                  </motion.button>
                </div>
                {project.featured && (
                  <div className={styles.featuredBadge}>Featured</div>
                )}
              </div>

              <div className={styles.projectContent}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.category}>{project.category}</span>
                </div>
                
                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.technologies}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={styles.techTag}>
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className={styles.projectActions}>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </motion.a>
                  
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeProject}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className={styles.modalImage}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  style={{ width: '100%', height: '300px' }}
                />
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                  <span className={styles.modalCategory}>{selectedProject.category}</span>
                </div>

                <p className={styles.modalDescription}>
                  {selectedProject.description}
                </p>

                <div className={styles.modalTechnologies}>
                  <h4 className={styles.techTitle}>Technologies Used</h4>
                  <div className={styles.techList}>
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className={styles.modalTechTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Live Demo
                  </motion.a>
                  
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalButtonSecondary}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View on GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;