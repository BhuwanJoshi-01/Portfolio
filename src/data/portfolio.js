import { Box, GraduationCap, Rocket, Code2, Cloud, Lightbulb, Globe, Server, Database, Smartphone, Wrench } from 'lucide-react';

/* ═══════════════════════════════════════════
   SINGLE SOURCE OF TRUTH FOR SITE CONTENT
   ═══════════════════════════════════════════ */

export const profile = {
  name: 'Bhuwan Joshi',
  fullName: 'Bhuwan Chakra Joshi',
  initials: 'BJ',
  photo: '/profile_picture.jpg',
  headline: 'Full Stack Developer · React Native + Web',
  roles: ['Full-stack', 'React Native', 'Django', 'Product-minded'],
  location: 'Kathmandu',
  intro:
    'Crafting scalable web applications and cross-platform mobile experiences with React, TypeScript, and modern full-stack architectures.',
  email: 'bhuwanj766@gmail.com',
  phone: '+977 9862488873',
  phoneHref: 'tel:+9779862488873',
  address: 'Baheshwor Heights, Kathmandu',
  website: 'https://joshibhuwan.com.np',
  startedBuilding: 2022,
  quote:
    'Great things are built by those who dare to imagine and execute. Let\'s build something the world remembers.',
};

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhuwanjoshi-np/' },
  { label: 'GitHub', href: 'https://github.com/BhuwanJoshi-01' },
];

export const projects = [
  // ── Featured ──────────────────────────────────────────────
  {
    id: 'setu',
    title: 'SETU - Sign Language Platform & 3D Avatars',
    category: '3D / AI',
    year: '2026',
    description:
      'A platform that turns speech and text into Nepali Sign Language performed by a 3D signer, paired with a gamified learning course. I work on the 3D signing avatars and the interactive web experience.',
    problem: '',
    impact: '',
    image: '/projects/setu3d.jpg',
    technologies: ['Three.js', 'React', 'Blender', 'Python', 'Node.js'],
    liveUrl: 'https://setu.prateekinnovations.com',
    githubUrl: '#',
    featured: true,
    confidential: true,
  },
  {
    id: 'heritagegraph',
    title: 'HeritageGraph',
    category: 'AI / Data',
    year: '2023—26',
    description:
      'A knowledge-graph platform that preserves Nepali cultural-heritage knowledge as linked data and makes it queryable, built with an RDF triplestore and OCR tooling. Contributed as part of CAIR-Nepal.',
    problem: 'Cultural-heritage knowledge was scattered and not machine-queryable.',
    impact: 'Heritage data modelled as linked data, queryable via API and chatbot.',
    image: '/projects/heritagegraph.jpg',
    technologies: ['Python', 'RDF / Oxigraph', 'Docker', 'Traefik'],
    liveUrl: 'https://heritagegraph.xyz',
    githubUrl: 'https://github.com/CAIRNepal/heritagegraph',
    featured: true,
    hidden: true,
  },
  {
    id: 'aida2026',
    title: 'AIDA 2026 - Hackathon Website & CMS',
    category: 'Web',
    year: '2026',
    description:
      'Public website and custom admin CMS for the AIDA "AI for People with Disability" hackathon, with an application portal and an accessibility target of WCAG 2.2 AA. Built for Prateek Innovations.',
    problem: 'Organisers needed to update content each season without a developer.',
    impact: '',
    image: '/projects/aida2026.jpg',
    technologies: ['React', 'Vite', 'Express', 'Prisma', 'MySQL'],
    liveUrl: 'https://aida.prateekinnovations.com',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 1,
    title: 'Forgex - Developer Learning Platform',
    category: 'Web',
    year: '2024',
    description:
      'A full-stack learning and mentoring platform for developers. Includes interactive resources, mentorship features, and modern responsive UI built for scale.',
    problem: 'Developers lacked a unified platform combining learning resources with direct mentorship.',
    impact: 'Serving real users with structured paths and interactive content.',
    image: '/forgexdev.png',
    technologies: ['Jinja', 'FastAPI', 'PostgreSQL', 'Django', 'Docker', 'WebRTC'],
    liveUrl: 'https://forgexdev.me',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'nepalai',
    title: 'Nepal AI Summit 2027',
    category: 'Web',
    year: '2026',
    description:
      'Conference website with CMS-managed speakers and events, registration, and online payment via ConnectIPS. Built for ICT Foundation Nepal.',
    problem: '',
    impact: '',
    image: '/projects/nepalaisummit.jpg',
    technologies: ['React', 'TypeScript', 'Express', 'MySQL', 'TanStack Query'],
    liveUrl: 'https://nepal-ai.org',
    githubUrl: '#',
    featured: true,
    hidden: true,
  },
  {
    id: 'mysunway',
    title: 'MySunway - College Floor Booking',
    category: 'Mobile',
    year: '2026',
    description:
      'A React Native app and web console for booking college floors and seats in real time, with admin management, announcements and push notifications. Built during a RAIN internship at Sunway College.',
    problem: 'Students had no real-time way to find and reserve study space on campus.',
    impact: '',
    image: '/projects/mysunway.jpg',
    technologies: ['React Native', 'Expo', 'Express', 'Firebase', 'Redux Toolkit'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },

  // ── Archive ───────────────────────────────────────────────
  {
    id: 3,
    title: 'KodeSQL',
    category: 'Web',
    year: '2024',
    description:
      'Full-stack web app for students to learn and solve SQL problems. Features challenge solving and an interactive interface.',
    problem: 'Students needed a hands-on environment to practice SQL with instant feedback.',
    impact: 'Interactive challenges with real-time query execution and validation.',
    image: '/kodesql.png',
    technologies: ['Jinja', 'Django', 'PostgreSQL', 'Monaco Editor', 'MySQL'],
    liveUrl: 'https://kodesql.in',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'terranode',
    title: 'TerraNode - Smart Irrigation IoT',
    category: 'IoT',
    year: '2026',
    description:
      'A per-crop smart irrigation and fertigation system: ESP32 firmware runs valves and the pump offline, an MQTT service and Express API store the data, and React web + Expo mobile apps control it. Includes a browser digital-twin so it can be demoed without hardware.',
    problem: 'Smallholder farmers water and fertilize by guesswork, wasting water and nutrients.',
    impact: '',
    image: '/projects/terranode.jpg',
    technologies: ['ESP32', 'MQTT', 'Express', 'Postgres', 'React Native'],
    liveUrl: '#',
    githubUrl: 'https://github.com/sunwaycollege-research/terranode_smart_farms',
    featured: true,
  },
  {
    id: 'aagni',
    title: 'Aagni Guard - Fire-Safety Management',
    category: 'Mobile',
    year: '2026',
    description:
      'Billing, point-of-sale and inventory system for a fire-extinguisher business. Every sale automatically schedules an 11-month refill reminder. Expo mobile app, React PWA, and an Express/Prisma API.',
    problem: 'A fire-safety business ran on manual billing and paper service tracking.',
    impact: 'Turns mandatory annual refills into tracked, recurring revenue.',
    image: '',
    technologies: ['Expo', 'React', 'Express', 'Prisma', 'TypeScript'],
    liveUrl: 'https://agniniyantaran.com',
    githubUrl: 'https://github.com/BhuwanJoshi-01/Agni-Guard',
    featured: false,
  },
  {
    id: 'nyaya',
    title: 'Nyaya Sathi - AI Legal Assistant',
    category: 'AI / Data',
    year: '2026',
    description:
      'A fully local legal-information assistant for Nepal, in English and Nepali. It interviews the user, keeps a versioned case profile, and answers with citations from Nepali law using hybrid vector + full-text search — no cloud calls.',
    problem: 'Nepali citizens need legal information in their own language, kept private.',
    impact: '',
    image: '',
    technologies: ['TypeScript', 'Express', 'React', 'pgvector', 'Ollama'],
    liveUrl: '#',
    githubUrl: 'https://github.com/BhuwanJoshi-01/Lawyer_AI_Chatbot',
    featured: false,
  },
  {
    id: 'eaiscan',
    title: 'EAI Readiness Audit for .np',
    category: 'Research',
    year: '2026',
    description:
      'A toolchain that probes .np mail servers for internationalised-email (SMTPUTF8/EAI) support, with a Fastify API and a bilingual results site. Grew out of a winning entry at UA Adaptation & Hackathon Nepal 2026.',
    problem: 'No one knew whether Nepali mail servers accept addresses like राम@नेपाल.नेपाल.',
    impact: 'A June 2026 pilot audited 394 domains for internationalised-email support.',
    image: '/projects/eaiscan.jpg',
    technologies: ['Python', 'Fastify', 'React', 'SQLite', 'Docker'],
    liveUrl: '#',
    githubUrl: 'https://github.com/BhuwanJoshi-01/Internet-Localisation-Project-',
    featured: false,
  },
  {
    id: 'govtier',
    title: 'Gov-Tier Appointment Platform',
    category: 'Web',
    year: '2026',
    description:
      'A civic scheduling and case-management platform where citizens book audiences with ministers and ministry staff manage calendars, notes and documents, with role-based tiers and an immutable audit log. Built for a government context.',
    problem: '',
    impact: '',
    image: '',
    technologies: ['React', 'Express', 'Prisma', 'Firebase', 'Socket.IO'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    confidential: true,
  },
  {
    id: 'carpediem',
    title: 'Carpe Diem V2 - Team Platform',
    category: 'Web',
    year: '2026',
    description:
      'An internal project-management platform with role-based access for staff, interns and consultants: projects, tasks, leave approval, daily logs, real-time chat and versioned file storage. Proprietary company work.',
    problem: '',
    impact: '',
    image: '',
    technologies: ['React', 'TypeScript', 'Express', 'Prisma', 'Socket.IO'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    confidential: true,
  },
  {
    id: '8eleven',
    title: '8 Eleven Hostel Management',
    category: 'Web',
    year: '2026',
    description:
      'A full-stack hostel platform: student self-registration by code, room assignment, rent payments and verification, complaints, meal attendance, and cron-based reminders — delivered as an installable PWA with web push. Client project.',
    problem: '',
    impact: '',
    image: '/projects/hostel8eleven.jpg',
    technologies: ['Express', 'Prisma', 'PostgreSQL', 'React', 'Workbox'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'timeflow',
    title: 'TimeFlow - Productivity Suite',
    category: 'Web',
    year: '2026',
    description:
      'A productivity app combining an Eisenhower matrix, Kanban board, time blocking, a Pomodoro timer, rich-text notes and analytics. Rebuilt from a browser-only version into a React/TS app with an Express + Firestore backend.',
    problem: '',
    impact: '',
    image: '',
    technologies: ['React', 'TypeScript', 'Express', 'Firestore', 'Tiptap'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'vids',
    title: 'VIDS - Accessible Nonprofit Site',
    category: 'Web',
    year: '2026',
    description:
      'A React/Vite rebuild of a disability society\'s website, engineered for high accessibility (WCAG 2.2 AAA targets, verified with automated axe checks).',
    problem: 'An old single-file HTML site was neither accessible nor maintainable.',
    impact: '',
    image: '',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Playwright'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    hidden: true,
  },
  {
    id: 'pods',
    title: 'Pods - Multi-Machine GPU Mesh',
    category: 'AI / Infra',
    year: '2026',
    description:
      'An orchestration layer that pools several machines\' GPUs into a single llama.cpp inference mesh over Tailscale, handling discovery, capability-aware planning and fault tolerance.',
    problem: 'Running LLMs too large for any single machine\'s VRAM.',
    impact: 'Splits one model across a 3-machine mesh to enable otherwise-impossible inference.',
    image: '',
    technologies: ['TypeScript', 'Fastify', 'llama.cpp', 'Tailscale', 'Zod'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    hidden: true,
  },
  {
    id: 'eduvid',
    title: 'eduvid-pipeline - Auto Educational Video',
    category: 'AI / Data',
    year: '2026',
    description:
      'A scheduled pipeline that generates short children\'s educational videos — chaining generated clips with cloud text-to-speech narration, captions and a thumbnail, then publishing to YouTube.',
    problem: '',
    impact: '',
    image: '',
    technologies: ['Python', 'google-genai', 'Cloud TTS', 'YouTube API', 'ffmpeg'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'mantra',
    title: 'Mantra Mala - Japa Counter',
    category: 'Mobile',
    year: '2026',
    description:
      'An offline React Native counter for mantra and japa repetitions, with multiple counters, a 108-bead mala indicator, haptics and daily/session tracking.',
    problem: '',
    impact: '',
    image: '',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Zustand'],
    liveUrl: '#',
    githubUrl: 'https://github.com/BhuwanJoshi-01/MantraTracker',
    featured: false,
  },
  {
    id: 'codeveda',
    title: 'Codveda Web Dev Internship',
    category: 'Web',
    year: '2026',
    description:
      'Eight graded tasks across three levels, from static sites and a React calculator up to two full-stack apps: a CRUD "Item Vault" and a JWT-based "SecureAuth".',
    problem: '',
    impact: '',
    image: '',
    technologies: ['HTML/CSS/JS', 'React', 'Express', 'PostgreSQL', 'JWT'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'mlops',
    title: 'MLOps Pipeline - Diabetes Risk',
    category: 'AI / Data',
    year: '2026',
    description:
      'University MLOps coursework: an end-to-end diabetes-risk prediction pipeline with experiment tracking and orchestration.',
    problem: '',
    impact: '',
    image: '',
    technologies: ['Python', 'MLflow', 'Airflow', 'pandas', 'scikit-learn'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'hostelpro',
    title: 'HostelPro - Room Management',
    category: 'Web',
    year: '2026',
    description:
      'A PHP/MySQL hostel system with admin, staff and student portals: per-bed occupancy, payments, complaint tickets, CSV reports, CSRF protection and an audit log. University coursework.',
    problem: '',
    impact: '',
    image: '',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'Apache'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 2,
    title: 'Earthly Wonders',
    category: 'Web',
    year: '2023',
    description:
      'Frontend project focused on nature. Showcases responsive design and creative layouts inspired by the environment.',
    problem: 'Exploring creative visual design through nature-inspired aesthetics.',
    impact: 'Beautiful responsive layouts demonstrating CSS mastery.',
    image: '/Earthly_wonders.png',
    technologies: ['HTML', 'CSS'],
    liveUrl: '#',
    githubUrl: 'https://github.com/BhuwanJoshi-01/WEB_Project_Nature',
    featured: false,
  },
  {
    id: 'quickwash',
    title: 'QuickWash - Car Wash Booking',
    category: 'Mobile',
    year: '2024',
    description:
      'A comprehensive car wash booking platform with Node.js backend and React Native frontend. Features phone authentication, role-based access control, and real-time booking.',
    problem: 'Car wash businesses needed a modern booking system with real-time availability.',
    impact: 'Full-stack mobile app with real-time features and role-based access.',
    image: '/quickwash.png',
    technologies: ['Node.js', 'Express', 'Firebase', 'React Native', 'Expo'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Smart Refrigerator',
    category: 'IoT',
    year: '2023',
    description:
      'An Arduino-based smart refrigerator project using C++ and sensors for real-time monitoring.',
    problem: 'Automating refrigerator monitoring with IoT sensors.',
    impact: 'Real-time temperature and inventory monitoring system.',
    image: '/smart_refriedgerator.png',
    technologies: ['C++', 'Arduino', 'Sensors'],
    liveUrl: 'https://www.tinkercad.com/things/j1lbvtGtLyl-smart-refriedgerator',
    githubUrl: 'https://github.com/BhuwanJoshi-01/Smart_Refrigerator_Using_Arduino',
    featured: false,
  },
];

/** "Forgex - Developer Learning Platform" → { name: 'Forgex', tagline: 'Developer Learning Platform' } */
export const splitTitle = (title) => {
  const [name, ...rest] = title.split(' - ');
  return { name, tagline: rest.join(' - ') };
};

export const journey = [
  {
    year: '2026 — Present',
    title: '3D Systems, 3D Web & Sign Language AI',
    company: 'Prateek Innovations · Personal R&D',
    description:
      'Building 3D systems and interactive 3D websites, alongside research and product work on sign-language technology for more inclusive communication.',
    icon: Box,
  },
  {
    year: '2025 — 2026',
    title: 'Mobile & Advanced Server-Side Development',
    company: 'Independent / Contract',
    description:
      'Developing cross-platform mobile applications using React Native, Expo, and Flutter. Implementing advanced server-side architectures with microservices, real-time communication (WebSockets, WebRTC), and AI/ML integrations.',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'Self-directed Full-Stack Projects',
    company: 'Forgex · KodeSQL · QuickWash',
    description:
      'Django + PostgreSQL backends, React Native + Expo frontends. REST APIs, auth patterns, mentorship platforms, and real-time booking — shipped to real users.',
    icon: Rocket,
  },
  {
    year: '2023',
    title: 'Backend & Databases',
    company: 'Self-taught experiments',
    description:
      'Django, Node/Express, PostgreSQL, Redis, Firebase. Authentication patterns, REST design, schema modeling, deployment basics.',
    icon: Cloud,
  },
  {
    year: '2022',
    title: 'First Server-Side Experiments',
    company: 'Personal projects',
    description:
      'Built first REST APIs in Node and Django. Learned the full request lifecycle from URL to database, plus deployment fundamentals.',
    icon: Code2,
  },
  {
    year: 'Mar 2024',
    title: '+2 Completion',
    company: 'Little Buddha Academy, Mahendranagar',
    description:
      'Finished high school (GPA 3.0). Self-taught HTML, CSS, JavaScript, and React fundamentals during senior year — the start of the journey.',
    icon: Lightbulb,
  },
];

export const experiences = [
  {
    role: 'Development Intern',
    company: 'RAIN — Sunway College Kathmandu',
    location: 'Kathmandu, Nepal',
    period: 'Jan 2026 — Present',
    current: true,
    description:
      'Building features for the RAIN platform across mobile and web. Day-to-day work spans React Native development in TypeScript and backend integration with Node.js and Firebase.',
    responsibilities: [
      'Implement features for mobile and web clients with React Native and TypeScript',
      'Integrate backend services using Node.js and Firebase',
      'Collaborate with the team on bug resolution and code review',
      'Test and deploy modules across iOS, Android, and web targets',
    ],
    tech: ['TypeScript', 'React Native', 'Node.js', 'Firebase', 'Expo'],
  },
  {
    role: 'Junior AI Developer',
    company: 'Prateek Innovations',
    location: 'Kathmandu, Nepal',
    period: 'Feb 2026 — Present',
    current: true,
    description:
      'Promoted from Software Development Intern to Junior AI Developer in July 2026, after five months on the team. Building inclusive, AI-driven products — from 3D systems and interactive 3D web experiences to accessibility-focused tooling.',
    versions: [
      {
        version: 'v1.0',
        role: 'Software Development Intern',
        period: 'Feb 2026 — Jul 2026',
        note: 'Shipped user-facing web features, backend integrations and API work.',
      },
      {
        version: 'v2.0',
        role: 'Junior AI Developer',
        period: 'Jul 2026 — Present',
        note: 'Promoted · building inclusive AI products and 3D systems.',
        current: true,
      },
    ],
    responsibilities: [
      'Build AI-driven product features for inclusive, accessibility-focused tools',
      'Develop 3D systems and interactive 3D experiences for the web',
      'Develop and ship user-facing features for web applications',
      'Build backend integrations and contribute to API work',
      'Participate in code reviews and design discussions',
    ],
    tech: ['Python', 'Blender', 'Three.js', 'TypeScript', 'React', 'Node.js'],
  },
];

export const skillCategories = [
  {
    title: 'Frontend & UI',
    icon: Globe,
    skills: [
      { name: 'React', tier: 'daily' },
      { name: 'TypeScript', tier: 'comfortable' },
      { name: 'Tailwind CSS', tier: 'daily' },
      { name: 'Framer Motion', tier: 'comfortable' },
      { name: 'HTML5/CSS3', tier: 'daily' },
      { name: 'Next.js', tier: 'learning' },
    ],
  },
  {
    title: 'Backend & API',
    icon: Server,
    skills: [
      { name: 'Node.js', tier: 'daily' },
      { name: 'Express', tier: 'comfortable' },
      { name: 'Django', tier: 'comfortable' },
      { name: 'REST APIs', tier: 'daily' },
      { name: 'GraphQL', tier: 'learning' },
    ],
  },
  {
    title: 'Database & Cloud',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', tier: 'comfortable' },
      { name: 'Firebase', tier: 'daily' },
      { name: 'Redis', tier: 'comfortable' },
      { name: 'MongoDB', tier: 'learning' },
      { name: 'Docker', tier: 'learning' },
    ],
  },
  {
    title: 'Mobile & AI',
    icon: Smartphone,
    skills: [
      { name: 'React Native', tier: 'daily' },
      { name: 'Expo', tier: 'comfortable' },
      { name: 'TensorFlow', tier: 'learning' },
      { name: 'Linear Algebra for AI', tier: 'comfortable' },
    ],
  },
  {
    title: 'Tools & CS Foundations',
    icon: Wrench,
    skills: [
      { name: 'Git', tier: 'daily' },
      { name: 'Linux', tier: 'comfortable' },
      { name: 'DSA', tier: 'comfortable' },
      { name: 'GitHub Actions', tier: 'learning' },
      { name: 'Jest', tier: 'learning' },
    ],
  },
];

export const explorations = [
  { src: '/forgexdev.png', title: 'Forgex', caption: 'Learning platform UI' },
  { src: '/kodesql.png', title: 'KodeSQL', caption: 'SQL challenge editor' },
  { src: '/profile_picture.jpg', title: 'Behind the code', caption: 'Bhuwan, Kathmandu' },
  { src: '/quickwash.png', title: 'QuickWash', caption: 'Booking flow, mobile' },
  { src: '/Earthly_wonders.png', title: 'Earthly Wonders', caption: 'Nature-inspired layouts' },
  { src: '/smart_refriedgerator.png', title: 'Smart Refrigerator', caption: 'Arduino + sensors' },
];

/* Résumé — mirrors mycv.txt */
export const resume = {
  contactLine: ['Baheshwor Heights, Kathmandu, Bagmati 121001', 'bhuwanj766@gmail.com', '+977-9862488873', 'joshibhuwan.com.np'],
  education: [
    {
      school: 'Sunway College Kathmandu',
      place: 'Kathmandu, Nepal',
      degree: 'Candidate for BSc (Hons) Computer Science with Artificial Intelligence',
      period: 'Sep 2024 — Current',
      note: 'Expected May 2028',
      detail:
        'Relevant coursework: Data Structures & Algorithms, Machine Learning, Linear Algebra for AI, Database Management Systems, and Software Engineering.',
    },
    {
      school: 'Little Buddha Academy',
      place: 'Mahendranagar, Sudurpaschim',
      degree: '+2 High School Certification',
      period: 'Mar 2024',
      note: 'GPA 3.0',
    },
  ],
  experience: [
    {
      company: 'Sunway College Kathmandu',
      place: 'Kathmandu, Nepal',
      role: 'RAIN Development Intern',
      period: 'Jan 2026 — Current',
      bullets: [
        'Engineered and deployed high-quality features using a TypeScript, React Native, and Node.js/Firebase stack, improving application responsiveness and user interface fluidity.',
        'Collaborated on the resolution of critical system bugs, enhancing overall platform reliability and reducing error rates during peak usage.',
        'Implemented adaptive design principles to ensure optimal functionality and viewing across multiple mobile and web platforms, increasing potential user reach.',
        'Executed thorough testing and deployment support for new modules, resulting in a documented improvement in customer engagement and system performance.',
      ],
    },
    {
      company: 'Prateek Innovations',
      place: 'Kathmandu, Nepal',
      role: 'Junior AI Developer',
      period: 'Jul 2026 — Current',
      bullets: experiences[1].responsibilities.slice(0, 2),
    },
    {
      company: 'Prateek Innovations',
      place: 'Kathmandu, Nepal',
      role: 'Software Development Intern',
      period: 'Feb 2026 — Jul 2026',
      bullets: experiences[1].responsibilities.slice(2),
    },
  ],
  skills: {
    Technical:
      'Proficient in Python (Django), JavaScript (Express, Node.js, React Native), TypeScript, Firebase, and Git Version Control.',
    Language: 'Nepali (Native), Hindi (Native), English (Proficient – EPT 6.5).',
    Interests:
      'Building personal software projects, exploring AI-driven digital products, competitive coding challenges, and emerging tech trends.',
  },
};

const totalTools = skillCategories.reduce((n, c) => n + c.skills.length, 0);

export const stats = [
  { value: new Date().getFullYear() - profile.startedBuilding, suffix: '+', label: 'Years Building' },
  { value: projects.filter((p) => !p.hidden).length, suffix: '+', label: 'Projects Shipped' },
  { value: totalTools, suffix: '', label: 'Tools in Rotation' },
];

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey', desktopOnly: true },
  { id: 'skills', label: 'Skills', desktopOnly: true },
  { id: 'resume', label: 'Resume', route: '/resume' },
];
