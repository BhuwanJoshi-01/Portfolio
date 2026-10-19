import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Printer, ArrowLeft } from 'lucide-react';
import PillButton from '../components/UI/PillButton';
import FooterBar from '../components/UI/FooterBar';
import { profile, resume, skillCategories } from '../data/portfolio';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
};

const Block = ({ label, children }) => (
  <motion.section {...reveal} className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-10 md:py-14 border-t border-stroke break-inside-avoid">
    <h2 className="text-xs text-muted uppercase tracking-[0.3em] pt-1">{label}</h2>
    <div className="flex flex-col gap-10">{children}</div>
  </motion.section>
);

const Entry = ({ title, subtitle, place, period, note, children }) => (
  <article className="break-inside-avoid">
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
      <h3 className="font-display italic text-2xl md:text-3xl text-text-primary leading-tight">{title}</h3>
      <span className="text-xs text-muted uppercase tracking-[0.2em] shrink-0">{period}</span>
    </div>
    <p className="mt-1 text-sm text-text-primary/90">
      {subtitle}
      {place && <span className="text-muted"> · {place}</span>}
    </p>
    {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    {children}
  </article>
);

const Resume = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = `Résumé — ${profile.fullName}`;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-bg pt-32 md:pt-40 pb-10">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12 md:pb-16"
        >
          <Link
            to="/"
            className="no-print inline-flex items-center gap-2 text-xs text-muted uppercase tracking-[0.25em] hover:text-text-primary transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Back to portfolio
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex items-center gap-6">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-stroke"
              />
              <div>
                <span className="text-xs text-muted uppercase tracking-[0.3em]">Résumé</span>
                <h1 className="mt-2 text-5xl md:text-7xl font-display italic text-text-primary leading-[0.9] tracking-tight">
                  {profile.fullName}
                </h1>
              </div>
            </div>
            <div className="no-print">
              <PillButton as="button" variant="outline" onClick={() => window.print()}>
                <Printer size={15} /> Print / Save PDF
              </PillButton>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {resume.contactLine.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.header>

        <Block label="Education">
          {resume.education.map((ed) => (
            <Entry key={ed.school} title={ed.school} subtitle={ed.degree} place={ed.place} period={ed.period} note={ed.note}>
              {ed.detail && <p className="mt-4 text-sm text-muted leading-relaxed">{ed.detail}</p>}
            </Entry>
          ))}
        </Block>

        <Block label="Experience">
          {resume.experience.map((job) => (
            <Entry key={job.role} title={job.role} subtitle={job.company} place={job.place} period={job.period}>
              <ul className="mt-5 space-y-3">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-4 text-sm text-text-primary/85 leading-relaxed">
                    <span className="font-display italic text-muted tabular-nums shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Entry>
          ))}
        </Block>

        <Block label="Skills & Interests">
          <dl className="grid gap-6">
            {Object.entries(resume.skills).map(([k, v]) => (
              <div key={k} className="grid sm:grid-cols-[120px_1fr] gap-1 sm:gap-6">
                <dt className="font-display italic text-xl text-text-primary">{k}</dt>
                <dd className="text-sm text-muted leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-2">
            {skillCategories.flatMap((c) => c.skills).map((s) => (
              <span key={s.name} className="px-3 py-1 rounded-full text-xs border border-stroke text-text-primary/90">
                {s.name}
              </span>
            ))}
          </div>
        </Block>

        <FooterBar className="mt-6 no-print" />
      </div>
    </main>
  );
};

export default Resume;
