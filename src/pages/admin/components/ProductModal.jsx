import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext';

const productColumns = [
  'PULLEYS',
  'INDUSTRIAL GEARS',
  'INDUSTRIAL SPROCKETS',
  'INDUSTRIAL CHAINS',
  'ALL TYPES OF ASSEMBLY',
  'PLANT PRODUCTS',
  'INDUSTRIAL COUPLING',
  'INDUSTRIAL CASTING',
];

const ProductModal = ({ product, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [column, setColumn] = useState(productColumns[0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImage(product.image);
      setColumn(product.column || productColumns[0]);
      setPreviewUrl(product.image);
    } else {
      setName('');
      setDescription('');
      setImage('');
      setColumn(productColumns[0]);
      setPreviewUrl('');
    }
    setSelectedFile(null);
  }, [product]);

  // Cleanup preview URL when component unmounts or previewUrl changes
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that we have an image (either existing or new file)
    if (!image && !selectedFile) {
      alert('Please select an image for the product.');
      return;
    }
    
    let finalImageUrl = image;
    
    // If a new file is selected, upload it first
    if (selectedFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          finalImageUrl = response.data.imageUrl;
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Upload failed:', error);
        const errorMessage = error.response?.data?.error || 'Failed to upload image. Please try again.';
        alert(errorMessage);
        setUploading(false);
        return;
      }
      setUploading(false);
    }
    
    onSave({ ...product, name, description, image: finalImageUrl, column });
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Column (Subcategory)</label>
            <select
              value={column}
              onChange={e => setColumn(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              {productColumns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-600 mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {previewUrl && (
              <div className="mt-3">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg border"
                />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {selectedFile ? `Selected: ${selectedFile.name}` : 'Choose an image file (JPG, PNG, GIF)'}
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal; 