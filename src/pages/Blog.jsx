import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const blogs = [
  {
    title: 'The Future of Industrial Automation',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Explore how AI, robotics, and IoT are revolutionizing the manufacturing landscape and what it means for the future.',
    date: '2024-06-01',
    author: 'Laksh Madaan',
  },
  {
    title: '5 Ways to Boost Your Plant Efficiency',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover actionable strategies to increase productivity and reduce downtime in your industrial plant.',
    date: '2024-05-20',
    author: 'Nishi Team',
  },
  {
    title: 'Why Maintenance is the Key to Longevity',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Learn how regular maintenance can save costs and extend the life of your equipment.',
    date: '2024-05-10',
    author: 'Amit Sharma',
  },
  {
    title: 'Top 10 Power Transmission Innovations',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    excerpt: 'A countdown of the most exciting breakthroughs in gears, couplings, and chains.',
    date: '2024-04-28',
    author: 'Nishi Enterprise',
  },
];

const Blog = () => {
  const cardsRef = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: -60, opacity: 0, rotateX: 60 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'expo.out' }
    );
    gsap.fromTo(
      cardsRef.current,
      { y: 80, opacity: 0, rotate: 8, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.18,
        ease: 'elastic.out(1, 0.7)',
        delay: 0.3,
      }
    );
  }, []);

  // Card hover animation
  const handleMouseEnter = (idx) => {
    gsap.to(cardsRef.current[idx], {
      scale: 1.04,
      rotate: gsap.utils.random(-4, 4),
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
      duration: 0.18,
      ease: 'power2.out',
    });
  };
  const handleMouseLeave = (idx) => {
    gsap.to(cardsRef.current[idx], {
      scale: 1,
      rotate: 0,
      boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)',
      duration: 0.22,
      ease: 'expo.out',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20 px-4">
      <h1
        ref={headingRef}
        className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 mb-12 tracking-tight drop-shadow-lg"
        style={{ perspective: 600 }}
      >
        Our Blog
      </h1>
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            ref={el => (cardsRef.current[idx] = el)}
            className="group bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col transition-transform duration-300 cursor-pointer hover:shadow-2xl border border-blue-100 relative"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {new Date(blog.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4 flex-1">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-xs text-gray-500">By</span>
                <span className="text-sm font-semibold text-blue-600">{blog.author}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; 