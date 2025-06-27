import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
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
        y: -10,
        rotateX: -90,
        transition: { duration: 0.3, ease: 'easeInOut' }
    },
    visible: { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        transition: { 
            duration: 0.4, 
            ease: 'easeInOut',
            staggerChildren: 0.05,
            delayChildren: 0.1,
        }
    }
};

const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-white shadow-md py-3 px-4 md:px-8 flex items-center justify-between fixed top-0 left-0 z-50 animate-fadeInDown">
            <div className="flex items-center gap-4 md:gap-8">
                <Link to="/" className="flex items-center gap-2 font-bold text-black hover:text-blue-600 transition-colors duration-300 text-xl md:text-2xl">
                    {navItems[0].icon}
                </Link>
                {/* Hamburger for mobile */}
                <button className="md:hidden ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-4 md:gap-6 ml-2 md:ml-6">
                    {navItems.slice(1).map((item) => {
                        if (item.name === "Our Products") {
                            return (
                                <li key={item.name} className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                                    <button className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group flex items-center text-base md:text-lg">
                                        {item.name}
                                        <FiChevronDown className={`ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div 
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={dropdownVariants}
                                                style={{ perspective: '1000px', transformOrigin: 'top center' }}
                                                className="absolute left-1/2 -translate-x-1/2 mt-4 w-max max-w-5xl bg-white rounded-lg shadow-2xl p-4 md:p-8"
                                            >
                                                <motion.div 
                                                    className="grid grid-cols-1 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-4 md:gap-y-6"
                                                    variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
                                                >
                                                    {Object.entries(productData).map(([category, subcategories]) => (
                                                        <motion.div key={category} variants={columnVariants}>
                                                            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2 md:mb-4 border-b-2 border-blue-500 pb-1 md:pb-2">{category}</h3>
                                                            {Object.entries(subcategories).map(([subcategory, items]) => (
                                                                <div key={subcategory} className="mb-4">
                                                                    <h4 className="font-semibold text-gray-800 text-md cursor-pointer hover:text-blue-600" onClick={() => {
                                                                        navigate(`/catalogue?column=${encodeURIComponent(subcategory)}`);
                                                                        setIsDropdownOpen(false);
                                                                    }}>{subcategory}</h4>
                                                                    <ul className="mt-3 space-y-2">
                                                                        {items.map(item => (
                                                                            <li key={item}>
                                                                                <a href="#" className="text-gray-600 hover:text-blue-600 text-sm block transition-colors duration-200">{item}</a>
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
                        if (item.name === "Catalogue") {
                            return (
                                <li key={item.name}>
                                    <Link
                                        to="/catalogue"
                                        className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group text-base md:text-lg"
                                    >
                                        {item.name}
                                        <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </Link>
                                </li>
                            );
                        }
                        return (
                            <li key={item.name}>
                                {item.name === "Contact" ? (
                                    <Link
                                        to="/contact"
                                        className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group text-base md:text-lg"
                                    >
                                        {item.name}
                                        <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </Link>
                                ) : item.name === "About Us" ? (
                                    <Link
                                        to="/about-us"
                                        className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group text-base md:text-lg"
                                    >
                                        {item.name}
                                        <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </Link>
                                ) : item.name === "Our Blog" ? (
                                    <Link
                                        to="/blog"
                                        className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group text-base md:text-lg"
                                    >
                                        {item.name}
                                        <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </Link>
                                ) : (
                                    <a
                                        href={`#${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-black font-medium hover:text-blue-600 transition-colors duration-300 relative group text-base md:text-lg"
                                    >
                                        {item.name}
                                        <span className="block h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <a
                href="/brochure.pdf"
                download
                className="ml-2 md:ml-4 px-4 md:px-5 py-2 bg-black text-white rounded-full font-semibold shadow hover:bg-blue-600 transition-colors duration-300 text-sm md:text-base"
            >
                Download Brochure
            </a>
            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.ul 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }} 
                        className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col gap-2 py-4 px-6 md:hidden z-50"
                    >
                        {navItems.slice(1).map((item) => (
                            <li key={item.name}>
                                {item.name === "Catalogue" ? (
                                    <Link to="/catalogue" className="block py-2 text-black font-medium hover:text-blue-600 transition-colors duration-300">
                                        {item.name}
                                    </Link>
                                ) : item.name === "Our Products" ? (
                                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full text-left py-2 text-black font-medium hover:text-blue-600 transition-colors duration-300 flex items-center">
                                        {item.name}
                                        <FiChevronDown className={`ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : item.name === "Contact" ? (
                                    <Link to="/contact" className="block py-2 text-black font-medium hover:text-blue-600 transition-colors duration-300">
                                        {item.name}
                                    </Link>
                                ) : item.name === "About Us" ? (
                                    <Link to="/about-us" className="block py-2 text-black font-medium hover:text-blue-600 transition-colors duration-300">
                                        {item.name}
                                    </Link>
                                ) : item.name === "Our Blog" ? (
                                    <Link to="/blog" className="block py-2 text-black font-medium hover:text-blue-600 transition-colors duration-300">
                                        {item.name}
                                    </Link>
                                ) : (
                                    <a href={`#${item.name.toLowerCase().replace(/\s+/g, "-")}`} className="block py-2 text-black font-medium hover:text-blue-600 transition-colors duration-300">
                                        {item.name}
                                    </a>
                                )}
                                {/* Mobile dropdown for Our Products */}
                                {item.name === "Our Products" && isDropdownOpen && (
                                    <div className="bg-white rounded-lg shadow-lg mt-2 p-4">
                                        {Object.entries(productData).map(([category, subcategories]) => (
                                            <div key={category} className="mb-2">
                                                <h3 className="font-bold text-gray-900 text-base mb-2 border-b-2 border-blue-500 pb-1">{category}</h3>
                                                {Object.entries(subcategories).map(([subcategory, items]) => (
                                                    <div key={subcategory} className="mb-2">
                                                        <h4 className="font-semibold text-gray-800 text-sm cursor-pointer hover:text-blue-600" onClick={() => {
                                                            navigate(`/catalogue?column=${encodeURIComponent(subcategory)}`);
                                                            setIsDropdownOpen(false);
                                                            setMobileMenuOpen(false);
                                                        }}>{subcategory}</h4>
                                                        <ul className="mt-1 space-y-1">
                                                            {items.map(item => (
                                                                <li key={item}>
                                                                    <a href="#" className="text-gray-600 hover:text-blue-600 text-xs block transition-colors duration-200">{item}</a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

// Animations (add to your global CSS or Tailwind config if not present):
// .animate-fadeInDown { animation: fadeInDown 0.7s ease; }
// @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } } 