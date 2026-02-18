import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, ArrowUpRight } from 'lucide-react';
import ParticleField from '../Motion/ParticleField';

const ContactStory = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

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
    { icon: Github, label: 'GitHub', href: 'https://github.com/BhuwanJoshi-01', color: '#333' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <ParticleField count={15} />

      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, var(--color-accent-glow), transparent)',
          opacity: 0.2,
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
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            Let's Build Something{' '}
            <span className="text-gradient">Amazing</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Have a project in mind or want to discuss the latest tech? I'm always open to new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map(({ icon: Icon, label, value, href }) => {
                const Wrapper = href ? 'a' : 'div';
                const wrapperProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {};
                return (
                  <Wrapper
                    key={label}
                    {...wrapperProps}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group cursor-pointer"
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
                );
              })}
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                Follow Me
              </h4>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl space-y-5"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Name</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleInputChange} required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                      '--tw-ring-color': 'var(--color-accent)',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Email</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleInputChange} required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                      '--tw-ring-color': 'var(--color-accent)',
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Subject</label>
                <input
                  type="text" id="subject" name="subject"
                  value={formData.subject} onChange={handleInputChange} required
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                    '--tw-ring-color': 'var(--color-accent)',
                  }}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>Message</label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleInputChange} required
                  rows={5} placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none focus:ring-2"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                    '--tw-ring-color': 'var(--color-accent)',
                  }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--color-gradient-start), var(--color-gradient-end))',
                  boxShadow: '0 4px 20px var(--color-accent-glow)',
                }}
              >
                <Send size={18} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactStory;
