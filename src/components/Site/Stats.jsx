import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { stats } from '../../data/portfolio';

const CountUp = ({ to, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
};

const Stats = () => (
  <section id="stats" className="relative bg-bg py-16 md:py-24">
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-stroke">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            className={`group py-10 md:py-14 md:px-8 first:md:pl-0 border-b md:border-b-0 border-stroke ${
              i > 0 ? 'md:border-l' : ''
            }`}
          >
            <div className="text-7xl md:text-8xl lg:text-9xl font-display text-text-primary leading-none">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="w-6 h-px bg-stroke group-hover:w-10 group-hover:accent-gradient transition-all duration-500" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
