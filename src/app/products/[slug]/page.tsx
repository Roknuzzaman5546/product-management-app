// app/products/[slug]/page.tsx
'use client';
import { useGetProductBySlugQuery, useDeleteProductMutation } from '../../../store/api';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfirmModal from '../../../components/ConfirmModal';
import { useState } from 'react';

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { data, isLoading } = useGetProductBySlugQuery(slug, { skip: !slug });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  async function handleDelete() {
    await deleteProduct(data.id).unwrap();
    router.push('/products');
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex gap-6">
        <div className="w-96">
          <img src={data.images?.[0] ?? '/placeholder.png'} alt={data.name} className="w-full h-72 object-cover rounded"/>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          <p className="text-muted mt-2">{data.description}</p>
          <div className="mt-4">
            <div className="text-sm text-muted">Category</div>
            <div>{data.category?.name}</div>
          </div>
          <div className="mt-4 text-xl font-semibold">${data.price}</div>

          <div className="mt-6 flex gap-2">
            <Link href={`/products/${slug}/edit`} className="px-4 py-2 border rounded">Edit</Link>
            <button className="px-4 py-2 bg-danger text-white rounded" onClick={() => setConfirmOpen(true)}>Delete</button>
          </div>
        </div>
      </div>

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
