import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const animatedPlaceholderText = 'Enter Your Email';

const EmailNewsletter = () => {
  const headingRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  // GSAP heading animation
  useEffect(() => {
    gsap.fromTo(
      headingRef.current.children,
      { y: 40, opacity: 0, rotateX: 60 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.35,
        stagger: 0.025,
        ease: 'power2.out',
      }
    );
  }, []);

  // Typewriter effect for placeholder
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(animatedPlaceholderText.slice(0, i + 1));
      i++;
      if (i > animatedPlaceholderText.length) {
        clearInterval(interval);
      }
    }, 150); // Slower, more deliberate typing speed
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  // Split heading for animation
  const heading = 'Subscribe for Updates & Newsletters';

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white flex flex-col items-center px-2 sm:px-4 md:px-0">
      <h2
        ref={headingRef}
        className="flex flex-wrap justify-center text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight text-center"
        style={{ perspective: 600 }}
      >
        {heading.split('').map((char, i) => (
          <span key={i} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-xl text-sm sm:text-base">
        Get the latest updates, product launches, and industry news delivered straight to your inbox.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md"
      >
        <input
          type="email"
          required
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base text-gray-900 placeholder-gray-400 bg-white w-full sm:w-auto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitted}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-colors duration-300 text-base w-full sm:w-auto"
          disabled={submitted}
        >
          {submitted ? 'Subscribed!' : 'Subscribe Now'}
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-green-600 font-medium animate-pulse text-center">Thank you for subscribing!</p>
      )}
    </section>
  );
};

export default EmailNewsletter; 