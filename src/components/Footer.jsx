import React from 'react';
import { FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-black bg-gradient-to-t from-gray-900 to-black text-gray-200 pt-12 pb-6 mt-12 border-t border-gray-800 shadow-inner">
    <div className="container mx-auto px-4 flex flex-col sm:flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
      {/* Company Info */}
      <div className="text-center md:text-left max-w-xs mb-6 md:mb-0 w-full md:w-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-wide">EngineerWorks</h2>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          Excellence in Transmission, Sprockets, Plant Products, Couplings, and Castings.<br/>
          <span className="text-gray-500">Quality engineering for your industry.</span>
        </p>
      </div>
      {/* Navigation Links */}
      <nav className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-8 text-base items-center font-medium w-full md:w-auto justify-center md:justify-start">
        <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
        <Link to="/catalogue" className="hover:text-blue-400 transition-colors duration-200">Catalogue</Link>
        <Link to="/about-us" className="hover:text-blue-400 transition-colors duration-200">About Us</Link>
        <Link to="/blog" className="hover:text-blue-400 transition-colors duration-200">Our Blog</Link>
        <Link to="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact</Link>
      </nav>
      {/* Social Media */}
      <div className="flex gap-5 items-center mt-6 md:mt-0 w-full md:w-auto justify-center md:justify-end">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors duration-200 bg-gray-800 p-2 rounded-full shadow hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-400">
          <FiInstagram size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200 bg-gray-800 p-2 rounded-full shadow hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <FiLinkedin size={24} />
        </a>
        <a href="mailto:info@engineerworks.com" className="hover:text-green-400 transition-colors duration-200 bg-gray-800 p-2 rounded-full shadow hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400">
          <FiMail size={24} />
        </a>
      </div>
    </div>
    <div className="mt-10 border-t border-gray-700 pt-5 text-center text-xs sm:text-sm text-gray-500 tracking-wide px-2">
      &copy; {new Date().getFullYear()} EngineerWorks. All rights reserved.
    </div>
  </footer>
);

export default Footer; 