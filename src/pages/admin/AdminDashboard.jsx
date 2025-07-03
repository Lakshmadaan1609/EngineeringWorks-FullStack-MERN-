import React, { useState, useContext, useEffect } from 'react';
import { FiPlus, FiLogOut } from 'react-icons/fi';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = 'https://engineerworks-backend.onrender.com/api/products';

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_URL}/${productId}`, getAuthHeaders());
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error('Failed to delete product', error);
      alert('Failed to delete product. Your session may have expired.');
      logout();
    }
  };

  const handleSaveProduct = async (productData) => {
    const product = {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      column: productData.column,
    };

    try {
      if (productData._id) {
        // Update existing product
        await axios.put(`${API_URL}/${productData._id}`, product, getAuthHeaders());
      } else {
        // Create new product
        await axios.post(API_URL, product, getAuthHeaders());
      }
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error('Failed to save product', error);
      alert('Failed to save product. Your session may have expired.');
      logout();
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">Products</h1>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={handleAddProduct}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 w-full sm:w-auto text-sm sm:text-base"
            >
              <FiPlus size={20} />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 w-full sm:w-auto text-sm sm:text-base"
            >
              <FiLogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {products.length > 0 ? products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={() => handleEditProduct(product)}
              onDelete={() => handleDeleteProduct(product._id)}
            />
          )) : <p>No products found. Add one to get started!</p>}
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          product={currentProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard; 