import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const ProductCard = ({ product, onEdit, onDelete, showActions = true }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h2>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        {showActions && (
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300"
            >
              <FiEdit size={16} />
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 