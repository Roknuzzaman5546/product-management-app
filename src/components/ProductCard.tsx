// components/ProductCard.tsx
import Link from 'next/link';
import { Eye, Trash2, DollarSign, Package } from 'lucide-react';

export default function ProductCard({ product, onDelete }: { product: any; onDelete: () => void }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {product.images?.[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <Package className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">No image</p>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
          <DollarSign className="w-4 h-4" />
          <span className="font-bold">{product.price}</span>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link 
            href={`/products/${product.slug}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center space-x-2 shadow-xl"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 flex-1 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Category Badge (if available) */}
        {product.category?.name && (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {product.category.name}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
          <Link 
            href={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Eye className="w-4 h-4 mr-2" />
            <span>View</span>
          </Link>
          
          <button 
            onClick={onDelete}
            className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}