import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Mail, Phone, MapPin, ArrowUpRight, Send } from 'lucide-react';
import HlsVideo from '../UI/HlsVideo';
import PillButton from '../UI/PillButton';
import FooterBar from '../UI/FooterBar';
import MagneticButton from '../Motion/MagneticButton';
import { profile } from '../../data/portfolio';

const MARQUEE = Array.from({ length: 10 }, () => 'BUILDING THE FUTURE • ').join('');
const revealEase = [0.25, 0.1, 0.25, 1];

const contactMethods = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { icon: MapPin, label: 'Location', value: profile.address, href: null },
];

const Field = ({ label, id, as = 'input', ...props }) => {
  const Tag = as;
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[10px] uppercase tracking-[0.25em] text-muted mb-2">{label}</span>
      <Tag
        id={id}
        name={id}
        required
        className="w-full bg-transparent border-b border-stroke focus:border-[#89AACC] px-0 py-3 text-sm text-text-primary placeholder:text-muted/60 outline-none transition-colors resize-none"
        {...props}
      />
    </label>
  );
};

const ContactStory = () => {
  const marqueeRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto =
      `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}` +
      `&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background video — mirrored hero stream */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HlsVideo lazy className="scale-y-[-1]" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden py-6 md:py-10 select-none" aria-hidden="true">
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="font-display italic text-6xl md:text-8xl lg:text-9xl text-text-primary/90 pr-4">
              {MARQUEE}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: revealEase }}
          className="flex flex-col items-center text-center pt-12 md:pt-16 pb-16 md:pb-24"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Get in touch</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-[-0.03em] leading-[1.05] text-text-primary max-w-4xl">
            Let&rsquo;s create something <em className="font-display italic tracking-normal">extraordinary</em>
          </h2>
          <p className="mt-5 text-sm md:text-base text-muted max-w-xl leading-relaxed">
            Have a project in mind or want to discuss the latest tech? I&rsquo;m always open to new opportunities.
          </p>
          <div className="mt-10">
            <PillButton variant="solid" href={`mailto:${profile.email}`}>
              <Mail size={16} /> {profile.email}
            </PillButton>
          </div>
        </motion.div>

        {/* Details + form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 pb-16 md:pb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: revealEase }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {contactMethods.map(({ icon: Icon, label, value, href }) => {
              const Wrapper = href ? 'a' : 'div';
              return (
                <Wrapper
                  key={label}
                  {...(href ? { href } : {})}
                  className="group flex items-center gap-4 p-4 rounded-full bg-surface/40 hover:bg-surface border border-stroke backdrop-blur-md transition-colors"
                >
                  <span className="w-11 h-11 shrink-0 rounded-full border border-stroke flex items-center justify-center text-text-primary">
                    <Icon size={17} strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-muted">{label}</span>
                    <span className="block text-sm text-text-primary truncate">{value}</span>
                  </span>
                  {href && (
                    <ArrowUpRight
                      size={16}
                      className="ml-auto mr-2 text-muted opacity-0 group-hover:opacity-100 group-hover:text-text-primary transition-opacity"
                    />
                  )}
                </Wrapper>
              );
            })}

            <blockquote className="mt-5 pl-5 border-l border-stroke">
              <p className="font-display italic text-xl md:text-2xl text-text-primary/90 leading-snug">
                &ldquo;{profile.quote}&rdquo;
              </p>
            </blockquote>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: revealEase }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-3xl bg-surface/60 backdrop-blur-md border border-stroke p-6 md:p-10 flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Name" id="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleInputChange} />
              <Field label="Email" id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} />
            </div>
            <Field label="Subject" id="subject" type="text" placeholder="Project Inquiry" value={formData.subject} onChange={handleInputChange} />
            <Field label="Message" id="message" as="textarea" rows={4} placeholder="Tell me about your project..." value={formData.message} onChange={handleInputChange} />

            <MagneticButton
              as="button"
              type="submit"
              strength={0.4}
              className="group relative self-start mt-2 rounded-full"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[2px] rounded-full accent-gradient-animated opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors">
                <Send size={15} /> Send Message
              </span>
            </MagneticButton>
          </motion.form>
        </div>

        <FooterBar />
      </div>
    </section>
  );
};

export default ContactStory;
