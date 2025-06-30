import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the form data to your backend or email service
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white flex items-center justify-center py-8 px-4 mt-9">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Contact Info */}
        <div className="flex-1 flex flex-col gap-6 justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <FiMapPin className="text-blue-500" />
            <span>123 Industrial Ave, Mumbai, India</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FiPhone className="text-blue-500" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FiMail className="text-blue-500" />
            <span>info@engineerworks.com</span>
          </div>
          <div className="flex gap-4 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors text-xl">
              <FiInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors text-xl">
              <FiLinkedin />
            </a>
          </div>
        </div>
        {/* Contact Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
            {submitted && (
              <div className="text-green-600 text-sm mt-2">Thank you for reaching out! We'll get back to you soon.</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 