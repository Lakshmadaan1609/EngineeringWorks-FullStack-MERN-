import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiStar, FiCheckCircle, FiShield, FiZap } from 'react-icons/fi';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const location = useLocation();
  const scrollRef = useRef(null);

  // Get column filter from query string
  const query = new URLSearchParams(location.search);
  const columnFilter = query.get('column');

  // Generate product highlights based on product type
  const getProductHighlights = (product) => {
    const highlights = [
      { icon: <FiStar className="text-yellow-500" />, text: "Premium quality materials" },
      { icon: <FiCheckCircle className="text-green-500" />, text: "ISO certified manufacturing" },
      { icon: <FiShield className="text-blue-500" />, text: "Durable and long-lasting" },
      { icon: <FiZap className="text-purple-500" />, text: "High performance design" },
    ];
    
    // Add category-specific highlights
    if (product.column?.includes('PULLEY')) {
      highlights.push({ icon: <FiCheckCircle className="text-green-500" />, text: "Precision balanced for smooth operation" });
    } else if (product.column?.includes('GEAR')) {
      highlights.push({ icon: <FiCheckCircle className="text-green-500" />, text: "Heat treated for maximum strength" });
    } else if (product.column?.includes('COUPLING')) {
      highlights.push({ icon: <FiCheckCircle className="text-green-500" />, text: "Vibration damping technology" });
    }
    
    return highlights;
  };

  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Scroll to filtered section if columnFilter is present
  useEffect(() => {
    if (columnFilter && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [columnFilter, loading]);

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  // Filter products if columnFilter is set
  const filteredProducts = columnFilter
    ? products.filter(p => p.column === columnFilter)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Product Catalogue</h1>
      <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
        Browse our wide range of industrial products and solutions.
      </p>
      <div
        className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        ref={columnFilter ? scrollRef : null}
      >
        {filteredProducts.length > 0 ? filteredProducts.map(product => (
          <div
            key={product._id}
            className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl border border-blue-100"
          >
            <div className="relative w-full h-40 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 text-xs font-semibold text-blue-600 shadow">
                New
              </div>
            </div>
            <div className="flex-1 flex flex-col p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-3 flex-1 text-sm">
                {product.description}
              </p>
              <button
                onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-300 self-start text-sm flex items-center gap-2"
              >
                View Details
                <motion.div
                  animate={{ rotate: expandedProduct === product._id ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <FiChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              
              {/* Expandable Details Section */}
              <AnimatePresence>
                {expandedProduct === product._id && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Product Highlights:</h3>
                    <div className="space-y-2">
                      {getProductHighlights(product).map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-sm"
                        >
                          {highlight.icon}
                          <span className="text-gray-700">{highlight.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Category: {product.column}</span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                          Premium
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )) : <p className="col-span-full text-center">No products available at the moment.</p>}
      </div>
    </div>
  );
};

export default Catalogue; 