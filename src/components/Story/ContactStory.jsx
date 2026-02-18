import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, ArrowUpRight } from 'lucide-react';
import ParticleField from '../Motion/ParticleField';
import SceneWrapper from '../Motion/SceneWrapper';
import { ease } from '../../hooks/useMotionConfig';

const ContactStory = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:bhuwanj766@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact Form Submission')}` +
      `&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
    window.location.href = mailto;
  };

  const contactMethods = [
    { icon: Mail, label: 'Email', value: 'bhuwanj766@gmail.com', href: 'mailto:bhuwanj766@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+977 9862488873', href: 'tel:+9779862488873' },
    { icon: MapPin, label: 'Location', value: 'Maitidevi, Kathmandu', href: null },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhuwanjoshi-np/', color: '#0077b5' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/BhuwanJoshi-01', color: '#6e5494' },
  ];

  const inputStyle = (fieldName) => ({
    background: 'var(--color-surface)',
    border: focusedField === fieldName
      ? '1px solid var(--color-accent)'
      : '1px solid var(--color-border)',
    color: 'var(--color-text)',
    boxShadow: focusedField === fieldName
      ? '0 0 20px var(--color-accent-glow)'
      : 'none',
    transition: 'all 0.3s ease',
  });

  return (
    <SceneWrapper id="contact" isLast glowColor="rgba(var(--color-accent-rgb), 0.12)" glowPosition="50% 100%">
      <div className="py-24 md:py-32 relative" style={{ background: 'var(--color-bg)' }}>
        <ParticleField count={15} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header — cinematic statement */}
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
              Get In Touch
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5" style={{ color: 'var(--color-text)' }}>
              Let's Create Something{' '}
              <span className="text-gradient">Extraordinary</span>
            </h2>
            <p className="max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Have a project in mind or want to discuss the latest tech? I'm always open to new opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Left — Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: ease.cinematic }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact methods */}
              <div className="space-y-4">
                {contactMethods.map(({ icon: Icon, label, value, href }, i) => {
                  const Wrapper = href ? 'a' : 'div';
                  const wrapperProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {};
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <Wrapper
                        {...wrapperProps}
                        className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group cursor-pointer gradient-border"
                        style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: 'var(--color-accent-glow)' }}>
                          <Icon size={20} style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{label}</p>
                          <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{value}</p>
                        </div>
                        {href && <ArrowUpRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--color-accent)' }} />}
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social links */}
              <div>
                <h4 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Follow Me
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, label, href, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -5, scale: 1.08, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 gradient-border"
                      style={{
                        background: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Cinematic closing statement */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              >
                <p className="text-sm italic leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  "Great things are built by those who dare to imagine and execute. Let's build something the world remembers."
                </p>
              </motion.div>
            </motion.div>

            {/* Right — Form with glowing inputs */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: ease.cinematic }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl space-y-5 gradient-border"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Name</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleInputChange} required
                      placeholder="Your Name"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Email</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleInputChange} required
                      placeholder="your@email.com"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={inputStyle('email')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Subject</label>
                  <input
                    type="text" id="subject" name="subject"
                    value={formData.subject} onChange={handleInputChange} required
                    placeholder="Project Inquiry"
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={inputStyle('subject')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Message</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleInputChange} required
                    rows={5} placeholder="Tell me about your project..."
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={inputStyle('message')}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 btn-magnetic"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))',
                    boxShadow: '0 4px 25px var(--color-accent-glow)',
                  }}
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};

export default ContactStory;
