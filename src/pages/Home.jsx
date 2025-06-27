import React from 'react';
import Hero from '../components/Hero';
import OurBlogSection from '../components/OurBlogSection';
import EmailNewsletter from '../components/EmailNewsletter';

const Home = () => {
  return (
    <div>
      <Hero />
      <OurBlogSection />
      <EmailNewsletter />
      {/* You can add other sections of your homepage below */}
    </div>
  );
};

export default Home; 