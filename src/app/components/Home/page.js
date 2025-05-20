'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
];

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const skills = [
    'Next.js', 'React', 'Node.js', 'MySQL', 'MongoDB', 'Express', 'Git', 'GitHub', 'Jira', 'Machine Learning'
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with Next.js and MongoDB.',
      logo: '/dangoo.jpeg',
      link: 'https://dangooenterprise.vercel.app/',
    },
    {
      id: 2,
      title: 'Blog Application',
      description: 'A full-featured blog app built with Next.js, MySQL, and Node.js.',
      logo: '/silk.jpeg',
      link: 'https://silk-road-blog-app.vercel.app/',
    },
    {
      id: 3,
      title: 'Biometric Authentication UI',
      description: 'A React-based frontend for biometric authentication systems.',
      logo: '/bio.jpeg',
      link: 'https://biometric-aunthentication-app.vercel.app/',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold tracking-wider">Patronilla Goren</div>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setIsContactOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors duration-300"
              >
                Contact Me
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/90 px-4 py-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-white py-2 transition-colors duration-300"
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
              className="block w-full text-left text-gray-300 hover:text-white py-2 transition-colors duration-300"
            >
              Contact Me
            </button>
          </motion.div>
        )}
      </nav>

      {/* Main Section */}
      <main className="pt-16">
        {/* Intro Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900/50 to-purple-900/50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-lg"
            />
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">Patronilla Goren</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Innovative Web Developer with a passion for building scalable, AI-driven applications. Specializing in modern JavaScript frameworks and backend technologies.
            </p>
          </motion.div>
        </section>

        {/* Skills & Details Section */}
        <section id="skills" className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Skills & Achievements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl ofont-semibold mb-4">Achievements & Details</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>5+ years of experience in full-stack web development</li>
                  <li>Led a team to develop an award-winning e-commerce platform</li>
                  <li>Contributed to open-source projects on GitHub</li>
                  <li>Proficient in Agile methodologies using Jira</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gradient-to-r from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={project.link} target="_blank">
                    <div className="relative w-full aspect-[3/2]">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-400">{project.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Socials Section */}
        <section id="contact" className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-12">Connect With Me</h2>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com" target="_blank" className="text-gray-300 hover:text-white text-3xl">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" className="text-gray-300 hover:text-white text-3xl">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" className="text-gray-300 hover:text-white text-3xl">
                <FaTwitter />
              </a>
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-gray-300 hover:text-white text-3xl"
              >
                <FaEnvelope />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Contact Modal */}
      {isContactOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Contact Me</h3>
            <p className="text-gray-300 mb-4">Feel free to reach out for collaborations or inquiries!</p>
            <p className="text-gray-300 mb-2"><strong>Email:</strong> john.doe@example.com</p>
            <p className="text-gray-300 mb-6"><strong>Phone:</strong> +1 (123) 456-7890</p>
            <button
              onClick={() => setIsContactOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-black py-6 text-center">
        <p className="text-gray-400">© 2025 Patronilla Goren. All rights reserved.</p>
      </footer>
    </div>
  );
}