import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const ProductCard = ({ product, onEdit, onDelete, showActions = true }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
      <img src={product.image} alt={product.name} className="w-full h-32 sm:h-40 object-cover" />
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1">{product.name}</h2>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 flex-grow">{product.description}</p>
        {showActions && (
          <div className="mt-auto pt-2 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <FiEdit size={16} />
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
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