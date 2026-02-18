import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

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
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={project.featured ? 'md:col-span-1' : ''}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group h-[24rem] md:h-[28rem] rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Content overlay */}
        <div
          style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
        >
          {/* Tech stack */}
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
          <p className="text-white/70 text-sm mb-4 line-clamp-2 group-hover:text-white/90 transition-colors duration-500">
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
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 20% 80%, var(--color-accent-glow), transparent)',
          opacity: 0.15,
        }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Selected Works
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            A curated collection of projects that showcase my passion for building impactful digital experiences.
          </p>
        </motion.div>

        {/* Featured projects — large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {projects.filter(p => p.featured).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Other projects — smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.filter(p => !p.featured).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
