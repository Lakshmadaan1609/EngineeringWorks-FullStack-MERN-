import React from 'react';
import Hero from '../components/Hero';
import OurBlogSection from '../components/OurBlogSection';
import EmailNewsletter from '../components/EmailNewsletter';
import FeatureHighlights from '../components/FeatureHighlights';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeatureHighlights />
      <OurBlogSection />
      <EmailNewsletter />
      {/* You can add other sections of your homepage below */}
    </div>
  );
};

export default Home; 