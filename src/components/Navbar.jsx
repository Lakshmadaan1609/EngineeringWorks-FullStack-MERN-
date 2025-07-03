import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const productData = {
    'Transmission Products': {
        'PULLEYS': ['Taper Lock Pulley', 'Timing Pulley', 'Pilot Bore & Solid Pulleys', 'Wire Rope Pulleys', 'Flywheels as per Dwg'],
        'INDUSTRIAL GEARS': ['Girth Gears', 'Spur Gears', 'Integral Pinions Gears Rack & Pinion'],
    },
    'Industrial Sprockets & Chains': {
        'INDUSTRIAL SPROCKETS': ['Two Stand Sprockets', 'Sprockets & Conveyors'],
        'INDUSTRIAL CHAINS': ['Heavy Duty Drag Chains', 'Roller Chains'],
        'ALL TYPES OF ASSEMBLY': [],
    },
    'Plant Products': {
        'PLANT PRODUCTS': ['Crane Wheel Assembly', 'Bearing Choke', 'Grate Bars', 'Plummer Blocks', 'PCM Moulds', 'Industrial Shafts', 'Bracket Assembly', 'Kiln Support Roller Assembly'],
    },
    'Industrial Coupling & Casting': {
        'INDUSTRIAL COUPLING': ['Gear Couplings and Spares', 'Brake Drum Couplings and Spares', 'Chain Couplings and Spares', 'Tyre Couplings and Spares', 'Bellow Couplings and Spares', 'Flexible Couplings'],
        'INDUSTRIAL CASTING': [],
    }
};

const navItems = [
  { name: "Home", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5" />
    </svg>
  ) },
  { name: "About Us" },
  { name: "Our Blog" },
  { name: "Catalogue" },
  { name: "Contact" },
  { name: "Our Products" },
];

const dropdownVariants = {
    hidden: { 
        opacity: 0, 
        y: -20,
        scale: 0.95,
        transition: { 
            duration: 0.2, 
            ease: [0.4, 0.0, 0.2, 1] // Custom cubic-bezier for smooth easing
        }
    },
    visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
            duration: 0.3, 
            ease: [0.4, 0.0, 0.2, 1],
            staggerChildren: 0.08,
            delayChildren: 0.05,
        }
    }
};

const columnVariants = {
    hidden: { 
        opacity: 0, 
        y: 15,
        transition: { 
            duration: 0.2, 
            ease: [0.4, 0.0, 0.2, 1]
        }
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
            duration: 0.3, 
            ease: [0.4, 0.0, 0.2, 1]
        }
    }
};

// Demo Logo Component
const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-xl text-gray-900 leading-tight">Engineer</span>
      <span className="font-bold text-xl text-blue-600 leading-tight">Works</span>
    </div>
  </div>
);

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = useRef(window.scrollY);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);
            if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
                // Scrolling down
                setShowNavbar(false);
            } else {
                // Scrolling up
                setShowNavbar(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: showNavbar ? 0 : -100 }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className={`w-full py-2 sm:py-3 px-2 sm:px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 z-50 ${
                scrolled
                    ? 'bg-white bg-gradient-to-r from-white via-sky-400/15 to-white backdrop-blur-md shadow-lg border-b border-gray-200/50'
                    : 'bg-white bg-gradient-to-r from-white via-sky-400/15 to-white backdrop-blur-sm'
            }`}
        >
            <div className="flex items-center gap-4 md:gap-8">
                <Link to="/" className="flex items-center gap-2 font-bold text-black hover:text-blue-600 transition-all duration-300 text-xl md:text-2xl group">
                    <Logo className="group-hover:scale-105 transition-transform duration-300" />
                </Link>
                
                {/* Hamburger for mobile */}
                <button className="flex lg:hidden ml-auto order-last" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                </button>
                
                {/* Desktop Nav */}
                <ul className="hidden lg:flex gap-6 md:gap-8 ml-4 md:ml-6">
                    {navItems.slice(1).map((item) => {
                        if (item.name === "Our Products") {
                            return (
                                <li key={item.name} className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                                    <button className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group flex items-center text-base md:text-lg">
                                        {item.name}
                                        <motion.div
                                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                                        >
                                            <FiChevronDown className="ml-1" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div 
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={dropdownVariants}
                                                className="absolute left-1/2 -translate-x-1/2 mt-4 w-max max-w-5xl bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100/50 p-5 md:p-7 max-h-96 overflow-y-auto"
                                            >
                                                <motion.div 
                                                    className="grid grid-cols-1 md:grid-cols-4 gap-x-7 md:gap-x-10 gap-y-5 md:gap-y-6"
                                                    variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
                                                >
                                                    {Object.entries(productData).map(([category, subcategories]) => (
                                                        <motion.div key={category} variants={columnVariants}>
                                                            <motion.h3 
                                                                className="font-bold text-gray-900 text-base md:text-lg mb-3 md:mb-4 border-b-2 border-blue-500 pb-2"
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                            >
                                                                {category}
                                                            </motion.h3>
                                                            {Object.entries(subcategories).map(([subcategory, items]) => (
                                                                <div key={subcategory} className="mb-4">
                                                                    <h4 className="font-semibold text-gray-800 text-sm md:text-base cursor-pointer hover:text-blue-600 transition-all duration-200 hover:translate-x-1" onClick={() => {
                                                                        navigate(`/catalogue?column=${encodeURIComponent(subcategory)}`);
                                                                        setIsDropdownOpen(false);
                                                                    }}>{subcategory}</h4>
                                                                    <ul className="mt-3 space-y-2">
                                                                        {items.map(item => (
                                                                            <li key={item}>
                                                                                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm block transition-all duration-200 hover:translate-x-1 hover:font-medium">{item}</a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            );
                        }
                        
                        const linkProps = {
                            "Catalogue": { to: "/catalogue" },
                            "Contact": { to: "/contact" },
                            "About Us": { to: "/about-us" },
                            "Our Blog": { to: "/blog" }
                        };

                        const linkInfo = linkProps[item.name];
                        
                        return (
                            <li key={item.name}>
                                {linkInfo ? (
                                    <Link
                                        to={linkInfo.to}
                                        className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group text-base md:text-lg"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </Link>
                                ) : (
                                    <a
                                        href={`#${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group text-base md:text-lg"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            
            <motion.a
                href="/brochure.pdf"
                download
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm group hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FiDownload className="w-4 h-4" />
                Download Brochure
            </motion.a>
            
            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }} 
                        className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col gap-2 py-4 px-6 md:hidden z-50 h-screen overflow-y-auto"
                    >
                        <div className="flex flex-col gap-1 py-3 px-4">
                            {navItems.slice(1).map((item) => (
                                <div key={item.name} className="py-1">
                                    {item.name === "Our Products" ? (
                                        <>
                                            <button
                                                className="block w-full text-left text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                                                onClick={() => setMobileProductsOpen((open) => !open)}
                                            >
                                                {item.name}
                                                <FiChevronDown className={`ml-2 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {mobileProductsOpen && (
                                                <div className="pl-4 pt-2">
                                                    {Object.entries(productData).map(([category, subcategories]) => (
                                                        <div key={category} className="mb-2">
                                                            <div className="font-semibold text-gray-800 text-sm mb-1">{category}</div>
                                                            {Object.entries(subcategories).map(([subcategory, items]) => (
                                                                <div key={subcategory} className="mb-1">
                                                                    <button
                                                                        className="text-gray-700 hover:text-blue-600 text-xs py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                                        onClick={() => {
                                                                            navigate(`/catalogue?column=${encodeURIComponent(subcategory)}&item=${encodeURIComponent(items[0])}`);
                                                                            setMobileMenuOpen(false);
                                                                            setMobileProductsOpen(false);
                                                                        }}
                                                                    >
                                                                        {subcategory}
                                                                    </button>
                                                                    {items.length > 0 && (
                                                                        <ul className="pl-4 list-disc text-gray-500 text-xs">
                                                                            {items.map(item => (
                                                                                <li key={item}>
                                                                                    <button
                                                                                        className="text-gray-700 hover:text-blue-600 py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                                                        onClick={() => {
                                                                                            navigate(`/catalogue?column=${encodeURIComponent(subcategory)}&item=${encodeURIComponent(item)}`);
                                                                                            setMobileMenuOpen(false);
                                                                                            setMobileProductsOpen(false);
                                                                                        }}
                                                                                    >
                                                                                        {item}
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : item.name === "Catalogue" ? (
                                        <Link
                                            to="/catalogue"
                                            className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : item.name === "Contact" ? (
                                        <Link
                                            to="/contact"
                                            className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : item.name === "About Us" ? (
                                        <Link
                                            to="/about-us"
                                            className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : item.name === "Our Blog" ? (
                                        <Link
                                            to="/blog"
                                            className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <a
                                            href={`#${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                                            className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </div>
                            ))}
                            <div className="pt-3 border-t border-gray-200/50">
                                <a
                                    href="/brochure.pdf"
                                    download
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-black text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                                >
                                    <FiDownload className="w-4 h-4" />
                                    Download Brochure
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

// Animations (add to your global CSS or Tailwind config if not present):
// .animate-fadeInDown { animation: fadeInDown 0.7s ease; }
// @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } } 