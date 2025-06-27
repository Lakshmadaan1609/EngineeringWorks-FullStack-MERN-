import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImage(product.image);
      setColumn(product.column || productColumns[0]);
    } else {
      setName('');
      setDescription('');
      setImage('');
      setColumn(productColumns[0]);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, name, description, image, column });
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
            <label className="block text-sm font-semibold text-gray-600 mb-1">Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.png"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal; 