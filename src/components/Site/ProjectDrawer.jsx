import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Lock } from 'lucide-react';
import { splitTitle } from '../../data/portfolio';

const drawerEase = [0.16, 1, 0.3, 1];

/**
 * Side drawer with the full project brief — portaled to <body> so it stays
 * fixed even when opened from inside a transformed (parallax) section.
 */
const ProjectDrawer = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-[200] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.15 } }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: drawerEase }}
            className="relative h-full w-full max-w-xl overflow-y-auto bg-surface border-l border-stroke"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-bg/80 backdrop-blur border border-stroke flex items-center justify-center text-text-primary hover:rotate-90 transition-transform duration-300"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[16/10] overflow-hidden">
              {project.image ? (
                <motion.img
                  src={project.image}
                  alt={project.title}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: drawerEase }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-bg">
                  <span className="absolute inset-0 accent-gradient opacity-10" />
                  <span className="font-display italic text-7xl text-text-primary/20">
                    {splitTitle(project.title).name}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: drawerEase }}
              className="px-6 md:px-10 pb-12 -mt-10 relative"
            >
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                {[project.category, project.year].filter(Boolean).join(' · ') || splitTitle(project.title).tagline || 'Project'}
              </span>
              <h3 className="mt-3 text-5xl md:text-6xl font-display italic text-text-primary leading-none">
                {splitTitle(project.title).name}
              </h3>
              {splitTitle(project.title).tagline && (
                <p className="mt-2 text-sm text-text-primary/80">{splitTitle(project.title).tagline}</p>
              )}
              <p className="mt-6 text-sm md:text-base text-muted leading-relaxed">{project.description}</p>

              {project.confidential && (
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-stroke px-4 py-1.5 text-xs text-muted">
                  <Lock size={12} /> Proprietary work — details kept intentionally brief.
                </p>
              )}

              {(project.problem || project.impact) && (
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ['Problem', project.problem],
                  ['Impact', project.impact],
                ].filter(([, text]) => text).map(([label, text]) => (
                  <div key={label} className="rounded-2xl border border-stroke bg-bg/50 p-5">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-muted mb-2">{label}</dt>
                    <dd className="text-sm text-text-primary leading-relaxed">{text}</dd>
                  </div>
                ))}
              </dl>
              )}

              <div className="mt-8">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-muted mb-3">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs border border-stroke text-text-primary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-text-primary text-bg px-6 py-3 text-sm hover:scale-105 transition-transform"
                  >
                    <ExternalLink size={14} /> Visit live
                  </a>
                )}
                {project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-stroke text-text-primary px-6 py-3 text-sm hover:border-white/30 transition-colors"
                  >
                    <Github size={14} /> Source code
                  </a>
                )}
                {project.liveUrl === '#' && project.githubUrl === '#' && !project.confidential && (
                  <span className="text-xs text-muted">Private build — demo available on request.</span>
                )}
              </div>
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectDrawer;
