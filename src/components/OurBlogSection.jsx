import React from 'react';

const blogPosts = [
  {
    title: 'How to Choose the Right Industrial Gear',
    summary: 'A quick guide to selecting the best gear for your application, including key factors and maintenance tips.',
    link: '#',
  },
  {
    title: 'The Future of Industrial Automation',
    summary: 'Explore the latest trends in automation and how they are transforming manufacturing processes.',
    link: '#',
  },
  {
    title: 'Maintenance Tips for Conveyor Chains',
    summary: 'Learn essential maintenance practices to extend the life of your conveyor chains and reduce downtime.',
    link: '#',
  },
];

const OurBlogSection = () => {
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-gray-50 px-2 sm:px-4 md:px-0">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Our Blog</h2>
        <p className="text-gray-600 mb-8 sm:mb-10 text-center max-w-2xl mx-auto text-sm sm:text-base">
          Insights, tips, and updates from the world of industrial engineering and manufacturing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-5 sm:p-6 flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 flex-1 text-sm sm:text-base">{post.summary}</p>
              <a href={post.link} className="mt-4 text-blue-600 hover:underline font-medium self-start text-sm sm:text-base">Read More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBlogSection; 