import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const scrollRef = useRef(null);

  // Get column filter from query string
  const query = new URLSearchParams(location.search);
  const columnFilter = query.get('column');

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
        className="grid gap-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        ref={columnFilter ? scrollRef : null}
      >
        {filteredProducts.length > 0 ? filteredProducts.map(product => (
          <div
            key={product._id}
            className="group bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-blue-100"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-blue-600 shadow">
                New
              </div>
            </div>
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4 flex-1">
                {product.description}
              </p>
              <button
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-colors duration-300 self-start"
              >
                View Details
              </button>
            </div>
          </div>
        )) : <p className="col-span-full text-center">No products available at the moment.</p>}
      </div>
    </div>
  );
};

export default Catalogue; 