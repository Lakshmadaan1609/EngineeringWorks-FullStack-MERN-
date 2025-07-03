import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiChevronDown, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

const slideData = [
    {
        image: '/img-1.jpg',
        title: 'Engineering Excellence, Building the Future',
        subtitle: 'Precision, Innovation, and Quality in Every Project.',
        description: 'We specialize in manufacturing high-quality industrial components with cutting-edge technology and unmatched expertise.',
        cta: 'Get Quote',
        secondaryCta: 'Watch Video'
    },
    {
        image: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        title: 'Pioneering Advanced Infrastructure',
        subtitle: 'From concept to completion, we deliver cutting-edge solutions.',
        description: 'Our comprehensive range of industrial products serves diverse sectors with reliability and performance.',
        cta: 'Explore Products',
        secondaryCta: 'Learn More'
    },
    {
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        title: 'Industrial Solutions for Tomorrow',
        subtitle: 'Innovation meets reliability in every component we manufacture.',
        description: 'Trusted by leading industries worldwide for our commitment to quality and technological advancement.',
        cta: 'Contact Us',
        secondaryCta: 'View Catalogue'
    }
];

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' }
    }
};

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut', delay: 0.3 }
    }
};

// Map secondary CTA to YouTube video links
const videoLinks = {
    'Watch Video': 'https://www.youtube.com/embed/2e-eXJ6HgkQ', // Example video
    'Learn More': 'https://www.youtube.com/embed/2e-eXJ6HgkQ', // Example video
    'View Catalogue': 'https://www.youtube.com/embed/2e-eXJ6HgkQ', // Optional
};

const Hero = () => {
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [quoteForm, setQuoteForm] = useState({ name: '', email: '' });
    const [quoteSubmitted, setQuoteSubmitted] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const navigate = useNavigate();

    // Unified CTA handler
    const handleCta = (cta) => {
        if (cta === 'Explore Products') navigate('/catalogue');
        else if (cta === 'Contact Us') navigate('/contact');
        else if (cta === 'Get Quote') setShowQuoteModal(true);
    };

    const handleSecondaryCta = (secondaryCta) => {
        if (secondaryCta === 'Learn More') {
            navigate('/about-us');
        } else if (videoLinks[secondaryCta]) {
            setVideoUrl(videoLinks[secondaryCta]);
            setShowVideoModal(true);
        }
    };

    const handleQuoteSubmit = (e) => {
        e.preventDefault();
        setQuoteSubmitted(true);
        setTimeout(() => {
            setShowQuoteModal(false);
            setQuoteSubmitted(false);
            setQuoteForm({ name: '', email: '' });
        }, 2000);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden pt-16 sm:pt-0">
            <Swiper
                modules={[Navigation, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                loop={true}
                speed={1000}
                className="h-full"
            >
                {slideData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="h-full w-full bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Overlay with gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
                            
                            {/* Animated background elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-2xl animate-float"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center">
                                <div className="w-full max-w-6xl mx-auto px-8 md:px-16">
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={textVariants}
                                        className="max-w-4xl"
                                    >
                                        {/* Title */}
                                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                                            {slide.title.split(' ').map((word, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                                                    className="inline-block mr-3 hover:text-blue-300 transition-colors duration-300"
                                                >
                                                    {word}
                                                </motion.span>
                                            ))}
                                    </h1>
                                        
                                        {/* Subtitle */}
                                        <motion.p
                                            variants={textVariants}
                                            className="text-lg md:text-xl text-blue-200 mb-4 font-medium"
                                        >
                                        {slide.subtitle}
                                        </motion.p>
                                        
                                        {/* Description */}
                                        <motion.p
                                            variants={textVariants}
                                            className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed"
                                        >
                                            {slide.description}
                                        </motion.p>
                                        
                                        {/* CTA Buttons */}
                                        <motion.div
                                            variants={buttonVariants}
                                            className="flex flex-col sm:flex-row gap-3"
                                        >
                                            {/* Main CTA Button (clean, single handler) */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="group bg-black text-white px-6 py-3 rounded-full font-semibold text-base shadow-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 btn-hover"
                                                onClick={() => handleCta(slide.cta)}
                                            >
                                                {slide.cta}
                                                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </motion.button>
                                            {/* Secondary CTA opens video modal if mapped */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="group bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold text-base border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 btn-hover"
                                                onClick={() => handleSecondaryCta(slide.secondaryCta)}
                                            >
                                                <FiPlay className="w-4 h-4" />
                                                {slide.secondaryCta}
                                            </motion.button>
                                        </motion.div>
                                        
                                        {/* Stats */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6 }}
                                            className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/20"
                                        >
                                            <div className="text-center group">
                                                <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">25+</div>
                                                <div className="text-gray-300 text-xs">Years Experience</div>
                                            </div>
                                            <div className="text-center group">
                                                <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">500+</div>
                                                <div className="text-gray-300 text-xs">Projects Completed</div>
                                            </div>
                                            <div className="text-center group">
                                                <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">50+</div>
                                                <div className="text-gray-300 text-xs">Countries Served</div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* Custom Navigation */}
            <div className="swiper-button-next w-8 h-8 sm:!w-12 sm:!h-12 !text-white !bg-white/10 !backdrop-blur-md !rounded-full !border !border-white/20 hover:!bg-white/20 transition-all duration-300"></div>
            <div className="swiper-button-prev w-8 h-8 sm:!w-12 sm:!h-12 !text-white !bg-white/10 !backdrop-blur-md !rounded-full !border !border-white/20 hover:!bg-white/20 transition-all duration-300"></div>
            
            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
            >
                <span className="text-sm mb-2">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-3 bg-white/50 rounded-full mt-2"
                    />
                </motion.div>
            </motion.div>
            
            {/* Modal for Get Quote (moved outside Swiper for efficiency) */}
            {showQuoteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative"
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                            onClick={() => setShowQuoteModal(false)}
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Get a Quote</h2>
                        {quoteSubmitted ? (
                            <div className="text-green-600 text-center font-semibold py-8">Thank you! We'll contact you soon.</div>
                        ) : (
                            <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={quoteForm.name}
                                    onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={quoteForm.email}
                                    onChange={e => setQuoteForm({ ...quoteForm, email: e.target.value })}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
            
            {/* Modal for Video */}
            {showVideoModal && videoUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-black rounded-2xl shadow-2xl p-2 md:p-4 w-full max-w-2xl relative flex flex-col items-center"
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10"
                            onClick={() => setShowVideoModal(false)}
                        >
                            <FiX className="w-7 h-7" />
                        </button>
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                            <iframe
                                src={videoUrl}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <style>{`
                .swiper-button-next::after, .swiper-button-prev::after {
                    font-size: 18px;
                }
            `}</style>
        </div>
    );
};

export default Hero; 