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

  const API_URL = 'http://localhost:5000/api/products';

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
      <div className="container mx-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Products</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
            >
              <FiPlus size={20} />
              <span>Add Product</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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