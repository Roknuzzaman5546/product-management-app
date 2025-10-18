// app/products/[slug]/page.tsx
'use client';
import { useGetProductBySlugQuery, useDeleteProductMutation } from '../../../store/api';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfirmModal from '../../../components/ConfirmModal';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Package, 
  DollarSign, 
  Tag, 
  FileText,
  Loader2,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data, isLoading } = useGetProductBySlugQuery(slug, { skip: !slug });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link 
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  async function handleDelete() {
    await deleteProduct(data.id).unwrap();
    router.push('/products');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
              {data.images?.[0] ? (
                <img 
                  src={data.images[0]} 
                  alt={data.name} 
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              ) : (
                <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-200 rounded-xl">
                  <ImageIcon className="w-20 h-20 text-gray-400 mb-4" />
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
              {/* Additional Images Indicator */}
              {data.images && data.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  +{data.images.length - 1} more
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-10 flex flex-col">
              {/* Product Name */}
              <div className="flex items-start space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {data.name}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Description
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Category */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Category
                  </h3>
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-lg font-medium">
                  {data.category?.name || 'Uncategorized'}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Price
                  </h3>
                </div>
                <div className="text-4xl font-bold text-gray-900">
                  ${data.price}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-6 border-t-2 border-gray-100">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href={`/products/${slug}/edit`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Product
                  </Link>
                  
                  <button 
                    onClick={() => setConfirmOpen(true)}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Product ID</p>
              <p className="font-semibold text-gray-900 truncate">{data.id}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Category</p>
              <p className="font-semibold text-gray-900">{data.category?.name || 'N/A'}</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Images</p>
              <p className="font-semibold text-gray-900">{data.images?.length || 0} image(s)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete product?"
        description={`Are you sure you want to delete ${data.name}?`}
        onConfirm={handleDelete}
        onClose={() => setConfirmOpen(false)}
        loading={isDeleting}
      />
    </div>
  );
}