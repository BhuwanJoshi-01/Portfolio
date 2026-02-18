import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import SceneWrapper from '../Motion/SceneWrapper';
import { ease } from '../../hooks/useMotionConfig';

const projects = [
  {
    id: 1,
    title: 'Forgex - Developer Learning Platform',
    description: 'A full-stack learning and mentoring platform for developers. Includes interactive resources, mentorship features, and modern responsive UI built for scale.',
    problem: 'Developers lacked a unified platform combining learning resources with direct mentorship.',
    impact: 'Serving real users with structured paths and interactive content.',
    image: '/forgexdev.png',
    technologies: ['Jinja', 'FastAPI', 'PostgreSQL', 'Django', 'Docker', 'WebRTC'],
    liveUrl: 'https://forgexdev.me',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'KodeSQL',
    description: 'Full-stack web app for students to learn and solve SQL problems. Features challenge solving and an interactive interface.',
    problem: 'Students needed a hands-on environment to practice SQL with instant feedback.',
    impact: 'Interactive challenges with real-time query execution and validation.',
    image: '/kodesql.png',
    technologies: ['Jinja', 'Django', 'PostgreSQL', 'Monaco Editor', 'MySQL'],
    liveUrl: 'https://kodesql.in',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 5,
    title: 'QuickWash - Car Wash Booking',
    description: 'A comprehensive car wash booking platform with Node.js backend and React Native frontend. Features phone authentication, role-based access control, and real-time booking.',
    problem: 'Car wash businesses needed a modern booking system with real-time availability.',
    impact: 'Full-stack mobile app with real-time features and role-based access.',
    image: '/quickwash.png',
    technologies: ['Node.js', 'Express', 'Firebase', 'React Native', 'Expo'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Earthly Wonders',
    description: 'Frontend project focused on nature. Showcases responsive design and creative layouts inspired by the environment.',
    problem: 'Exploring creative visual design through nature-inspired aesthetics.',
    impact: 'Beautiful responsive layouts demonstrating CSS mastery.',
    image: '/Earthly_wonders.png',
    technologies: ['HTML', 'CSS'],
    liveUrl: '#',
    githubUrl: 'https://github.com/BhuwanJoshi-01/WEB_Project_Nature',
    featured: false,
  },
  {
    id: 4,
    title: 'Smart Refrigerator',
    description: 'An Arduino-based smart refrigerator project using C++ and sensors for real-time monitoring.',
    problem: 'Automating refrigerator monitoring with IoT sensors.',
    impact: 'Real-time temperature and inventory monitoring system.',
    image: '/smart_refriedgerator.png',
    technologies: ['C++', 'Arduino', 'Sensors'],
    liveUrl: 'https://www.tinkercad.com/things/j1lbvtGtLyl-smart-refriedgerator',
    githubUrl: 'https://github.com/BhuwanJoshi-01/Smart_Refrigerator_Using_Arduino',
    featured: false,
  },
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Depth shadow that moves opposite to tilt
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);

  // Parallax image movement inside card on scroll
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: ease.cinematic }}
      ref={cardRef}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([sx, sy]) => `${sx}px ${sy}px 40px rgba(0,0,0,0.15)`
          ),
        }}
        className="relative group h-[24rem] md:h-[28rem] rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Parallax Image */}
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[130%] object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5 
          group-hover:from-black/95 group-hover:via-black/60 transition-all duration-700" />

        {/* Content overlay */}
        <div
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
        >
          {/* Problem → Impact reveal */}
          <div className="mb-3 max-h-0 overflow-hidden group-hover:max-h-[120px] transition-all duration-700 ease-out">
            <div className="flex gap-3 text-xs mb-2">
              <div className="px-2.5 py-1 rounded-full glass text-emerald-300 font-semibold">
                Problem
              </div>
              <div className="px-2.5 py-1 rounded-full glass text-amber-300 font-semibold">
                Impact
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed line-clamp-2">{project.problem}</p>
            <p className="text-white/80 text-xs leading-relaxed mt-1 line-clamp-2">{project.impact}</p>
          </div>

          {/* Tech stack — reveal on hover */}
          <div className="flex flex-wrap gap-2 mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {project.technologies.map(tech => (
              <span key={tech} className="text-xs px-2.5 py-1 rounded-full glass text-white/90 font-medium">
                {tech}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:-translate-y-1 transition-transform duration-500">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm mb-4 line-clamp-2 group-hover:text-white/85 transition-colors duration-500">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-full glass hover:bg-white/20 transition-colors"
              >
                <ExternalLink size={14} /> Live
              </a>
            )}
            {project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-full glass hover:bg-white/20 transition-colors"
              >
                <Github size={14} /> Code
              </a>
            )}
          </div>
        </div>

        {/* Corner arrow */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
          <ArrowUpRight size={18} className="text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  return (
    <SceneWrapper id="projects" glowColor="rgba(var(--color-accent-rgb), 0.15)" glowPosition="20% 80%">
      <div className="py-24 md:py-32 relative" style={{ background: 'var(--color-surface)' }}>
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: ease.cinematic }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Selected Works
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5" style={{ color: 'var(--color-text)' }}>
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              A curated collection of projects that showcase my passion for building impactful digital experiences.
            </p>
          </motion.div>

          {/* Featured projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {projects.filter(p => p.featured).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Other projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.filter(p => !p.featured).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

export default ProjectShowcase;
