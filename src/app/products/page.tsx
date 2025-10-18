// app/products/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetProductsQuery, useDeleteProductMutation, useSearchProductsQuery } from '../../store/api';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/ConfirmModal';
import { useAppSelector } from '../../hooks';
import { Plus, Search, Package, AlertCircle, Loader2 } from 'lucide-react';

export default function ProductsPage() {
  const [limit] = useState(8);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [searchText, setSearchText] = useState('');
  const [deletingProduct, setDeletingProduct] = useState<any | null>(null);

  // choose search vs list
  const { data: searchData } = useSearchProductsQuery(
    { searchedText: searchText },
    { skip: searchText.length < 2 }
  );

  const { data: productsData, isLoading, isError } = useGetProductsQuery({ offset, limit }, { skip: !!searchText && searchText.length >= 2 });

  const products = searchText.length >= 2 ? searchData ?? [] : productsData ?? [];

  console.log('products', products);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  async function confirmDelete(id: string) {
    try {
      await deleteProduct(id).unwrap();
      setDeletingProduct(null);
      // RTK Query invalidation handled in API slice
    } catch (err) {
      alert('Delete failed');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Products</h2>
                <p className="text-gray-600 text-sm">Manage your product inventory</p>
              </div>
            </div>
            <Link 
              href="/products/new" 
              className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span>Create Product</span>
            </Link>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products by name (minimum 2 characters)"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
          </div>
          {searchText.length > 0 && searchText.length < 2 && (
            <p className="mt-2 text-sm text-gray-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Type at least 2 characters to search
            </p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-800 text-lg font-semibold">Failed to load products</p>
            <p className="text-red-600 text-sm mt-2">Please first <span className=' uppercase font-bold'><Link href="/login">login</Link></span> and try again later</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && (
          <>
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  {searchText ? 'Try adjusting your search terms' : 'Start by creating your first product'}
                </p>
                {!searchText && (
                  <Link 
                    href="/products/new" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Product
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p: any) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onDelete={() => setDeletingProduct(p)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!searchText && !isLoading && !isError && products.length > 0 && (
          <div className="mt-8">
            <Pagination page={page} setPage={setPage} pageSize={limit} />
          </div>
        )}

        {/* Confirm Delete Modal */}
        <ConfirmModal
          open={!!deletingProduct}
          title="Delete product?"
          description={`Delete "${deletingProduct?.name}" — this API simulates deletion; we still show confirmation.`}
          onConfirm={() => confirmDelete(deletingProduct.id)}
          onClose={() => setDeletingProduct(null)}
          loading={isDeleting}
        />
      </div>
    </div>
  );
}