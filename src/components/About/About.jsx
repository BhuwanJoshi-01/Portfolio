import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = {
    frontend: [
      "React",
      "Vue.js",
      "Vite",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "React Query",
      "Axios"
    ],
    backend: [
      "Node.js",
      "Express",
      "NestJS",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "Redis",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "MongoDB",
      "REST API"
    ],
    real_time_communication: [
      "WebSockets",
      "Socket.IO",
      "WebRTC",
      "Server-Sent Events (SSE)"
    ],
    authentication_authorization: [
      "JWT",
      "OAuth 2.0",
      "OpenID Connect",
      "Session-based Auth",
      "Passport.js",
      "Auth0",
      "Firebase Authentication"
    ],
    devops: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Nginx",
      "CI/CD Pipelines"
    ],
    cloud_platforms: [
      "AWS",
      "Google Cloud Platform",
      "Firebase",
      "Vercel",
      "Netlify",
      "DigitalOcean"
    ],
    ai_ml: [
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "TensorFlow",
      "PyTorch",
      "Matplotlib",
      "Seaborn"
    ],
    mobile: [
      "React Native",
      "Expo",
      "Android",
      "Flutter",
      "Gradlew"
    ],
    testing: [
      "Jest",
      "Playwright",
      "PyTest",
      "JUnit"
    ],
    build_tools_package_managers: [
      "Webpack",
      "Vite",
      "Babel",
      "npm",
      "yarn",
      "pnpm"
    ],
    monitoring_logging: [
      "Sentry",
      "Logstash"
    ],
    languages: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "PHP"
    ]
  };

const experience = [
  {
    year: '2025 - 2026',
    title: 'Mobile & Advanced Server-Side Development',
    company: '',
    description: 'Developed cross-platform mobile applications using React Native, Expo, and Flutter. Implemented advanced server-side architectures with microservices, real-time communication (WebSockets, WebRTC), and AI/ML integrations using TensorFlow and PyTorch.',
  },
  {
    year: '2023 - 2025',
    title: 'Full-Stack & Cloud Projects',
    company: '',
    description: 'Built comprehensive full-stack applications combining modern frontend frameworks with robust backend APIs. Leveraged cloud platforms (AWS, GCP, Firebase) and DevOps practices for scalable, secure deployments.',
  },
  {
    year: '2022',
    title: 'Cloud & DevOps Engineering',
    company: '',
    description: 'Mastered cloud infrastructure across AWS, GCP, and Azure. Implemented CI/CD pipelines, containerization with Docker/Kubernetes, and monitoring with Sentry for production-ready applications.',
  },
  {
    year: '2021',
    title: 'Advanced Backend & Databases',
    company: '',
    description: 'Designed and optimized database architectures using PostgreSQL, MySQL, MongoDB, and Redis. Implemented authentication systems with JWT, OAuth, and session management for secure applications.',
  },
  {
    year: '2020',
    title: 'Backend API Development',
    company: '',
    description: 'Created scalable REST APIs and GraphQL services using Node.js (Express, NestJS), Python (Django, FastAPI), and various authentication frameworks for modern web applications.',
  },
  {
    year: '2019',
    title: 'Frontend Development',
    company: '',
    description: 'Built responsive, interactive user interfaces using React, Vue.js, HTML5, CSS3, and modern CSS frameworks like Tailwind CSS for optimal user experiences.',
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
                about how things work on the web, and it has evolved into expertise across 
                the entire development spectrum - from responsive web applications and 
                cross-platform mobile apps to robust server-side architectures and cloud 
                infrastructure.
              </p>
              <p className={styles.bioText}>
                I've built everything from interactive web platforms and real-time 
                communication systems to mobile applications that serve thousands of users. 
                My experience spans modern frontend frameworks, scalable backend APIs, 
                database design, cloud deployment, and DevOps practices. I love tackling 
                complex challenges and turning innovative ideas into production-ready solutions.
              </p>
              <p className={styles.bioText}>
                When I'm not coding, you'll find me exploring emerging technologies, 
                contributing to open-source projects, mentoring aspiring developers, or 
                sharing insights through technical writing and community engagement.
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

            <motion.div className={styles.statsSection} variants={itemVariants}>
              <h3 className={styles.sectionTitle}>By the Numbers</h3>
              <div className={styles.statsGrid}>
                <motion.div 
                  className={styles.statItem}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className={styles.statNumber}>30+</span>
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
                  <span className={styles.statNumber}>70+</span>
                  <span className={styles.statLabel}>Technologies Mastered</span>
                </motion.div>
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
              <div className={styles.skillsCategories}>
                {Object.entries(skills).map(([category, skillList]) => (
                  <motion.div
                    key={category}
                    className={styles.categorySection}
                    variants={itemVariants}
                  >
                    <h4 className={styles.categoryTitle}>
                      {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h4>
                    <div className={styles.skillList}>
                      {skillList.map((skill, index) => (
                        <motion.span
                          key={skill}
                          className={styles.skillTag}
                          variants={itemVariants}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 123, 255, 0.1)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;