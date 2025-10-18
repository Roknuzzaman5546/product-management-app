// app/products/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetProductsQuery, useDeleteProductMutation, useSearchProductsQuery } from '../../store/api';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import ConfirmModal from '../../components/ConfirmModal';
import { useAppSelector } from '../../hooks';

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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Link href="/products/new" className="bg-primary text-white px-4 py-2 rounded-md">Create Product</Link>
      </div>

      <div className="flex gap-3 items-center mb-6">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search products by name (min 2 chars)"
          className="flex-1 border p-2 rounded-md"
        />
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div className="text-danger">Failed to load products</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p: any) => (
          <ProductCard
            key={p.id}
            product={p}
            onDelete={() => setDeletingProduct(p)}
          />
        ))}
      </div>

      {!searchText && (
        <div className="mt-6">
          <Pagination page={page} setPage={setPage} pageSize={limit} />
        </div>
      )}

      <ConfirmModal
        open={!!deletingProduct}
        title="Delete product?"
        description={`Delete "${deletingProduct?.name}" — this API simulates deletion; we still show confirmation.`}
        onConfirm={() => confirmDelete(deletingProduct.id)}
        onClose={() => setDeletingProduct(null)}
        loading={isDeleting}
      />
    </div>
  );
}
