'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowDown } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ['', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        if (section === '') return window.scrollY < window.innerHeight / 2;
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3;
      });
      
      if (current !== undefined) setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    'Next.js', 'React', 'Node.js', 'MySQL', 'MongoDB', 'Express', 'Git', 
    'GitHub', 'Jira', 'Machine Learning', 'Tailwind CSS', 'TypeScript'
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with Next.js and MongoDB.',
      logo: '/dangoo.jpeg',
      link: 'https://dangooenterprise.vercel.app/',
      tags: ['Next.js', 'MongoDB', 'Tailwind CSS']
    },
    {
      id: 2,
      title: 'Blog Application',
      description: 'A full-featured blog app built with Next.js, MySQL, and Node.js.',
      logo: '/silk.jpeg',
      link: 'https://silk-road-blog-app.vercel.app/',
      tags: ['Next.js', 'MySQL', 'Node.js']
    },
    {
      id: 3,
      title: 'Biometric Authentication UI',
      description: 'A React-based frontend for biometric authentication systems.',
      logo: '/bio.jpeg',
      link: 'https://biometric-aunthentication-app.vercel.app/',
      tags: ['React', 'TypeScript', 'WebAuthn']
    },
  ];

  // Parallax effect for hero background
  const heroBackgroundY = -scrollY * 0.2;
  
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Animated background dots/grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-blue-500/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="#" className="group">
              <div className="relative text-2xl font-bold tracking-wider">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Patronilla Goren
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 relative group ${activeSection === item.href.replace('#', '') ? 'text-white' : 'text-gray-400'}`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.href.replace('#', '') && (
                    <motion.span 
                      layoutId="activeSection"
                      className="absolute inset-0 bg-blue-600/20 rounded-md"
                      style={{ backdropFilter: 'blur(8px)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-md ml-2 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              >
                <span className="font-medium">Get In Touch</span>
              </button>
            </nav>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 top-2 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2' : 'top-4'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
            >
              <div className="px-4 py-6 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-800/50 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsContactOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-gray-300 hover:text-white py-2 px-4 rounded-md hover:bg-gray-800/50 transition-colors duration-300"
                >
                  Get In Touch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Section */}
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated gradient background */}
          <div 
            className="absolute inset-0 z-0"
            style={{ 
              transform: `translateY(${heroBackgroundY}px)`,
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(0, 0, 0, 0) 70%), radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)'
            }}
          />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative group mx-auto w-40 h-40 mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={160}
                  height={160}
                  className="rounded-full relative z-10 object-cover border-2 border-white/10"
                />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500">
                  Patronilla Goren
                </span>
              </h1>
              
              <div className="relative">
                <p className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  <span className="text-blue-400 font-semibold">Innovative</span> Web Developer with a passion for building 
                  <span className="text-purple-400 font-semibold"> scalable</span>, AI-driven applications.
                </p>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-8" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12"
            >
              <Link href="#skills" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                <span className="mr-2">Discover more</span>
                <FaArrowDown className="animate-bounce" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-blue-950/10 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="inline-block text-4xl md:text-5xl font-bold relative">
                Skills & Expertise
                <span className="block h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600 mt-2"></span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg hover:shadow-blue-500/5 transition-all duration-500"
              >
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-md text-sm shadow-md"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg hover:shadow-purple-500/5 transition-all duration-500"
              >
                <h3 className="text-2xl font-semibold mb-6 text-purple-400">Achievements & Experience</h3>
                <ul className="space-y-4">
                  {[
                    '5+ years of experience in full-stack web development',
                    'Led a team to develop an award-winning e-commerce platform',
                    'Contributed to open-source projects on GitHub',
                    'Proficient in Agile methodologies using Jira'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className="flex items-start"
                    >
                      <span className="inline-block h-2 w-2 mt-2 mr-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative bg-gradient-to-b from-black via-purple-950/10 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="inline-block text-4xl md:text-5xl font-bold relative">
                Featured Projects
                <span className="block h-1 w-full bg-gradient-to-r from-purple-500 to-blue-600 mt-2"></span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-500"
                >
                  <Link href={project.link} target="_blank" className="block relative group">
                    <div className="relative w-full aspect-[3/2] overflow-hidden">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">{project.title}</h3>
                        <div className="bg-blue-500/10 rounded-full p-1 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative bg-gradient-to-b from-black to-blue-950/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="inline-block text-4xl md:text-5xl font-bold relative">
                Connect With Me
                <span className="block h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600 mt-2"></span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Let's Work Together</h3>
                <p className="text-gray-300 mb-6">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                      <FaEnvelope className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-gray-200">patronilla.goren@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-gray-200">+1 (123) 456-7890</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <FaLinkedin />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-6 text-purple-400">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="button"
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-md text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
          
          {/* Animated gradient sphere */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl opacity-30" />
        </section>
      </main>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="bg-gray-900 p-8 rounded-xl max-w-md w-full border border-gray-800 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-400">Contact Me</h3>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-300 mb-6">Feel free to reach out for collaborations or inquiries!</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <FaEnvelope className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-gray-200">patronilla.goren@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-gray-200">+1 (123) 456-7890</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white font-medium shadow-md hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 bg-black/90 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Patronilla Goren
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Innovative Web Developer & Tech Enthusiast
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent my-6" />
          
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Patronilla Goren. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}