// app/products/[slug]/edit/page.tsx
'use client';
import { useGetProductBySlugQuery } from '../../../../store/api';
import ProductForm from '../../../../components/ProductForm';
import { useParams } from 'next/navigation';

export default function EditPage() {
  const params = useParams();
  const slug = params?.slug;
  const { data, isLoading } = useGetProductBySlugQuery(slug as string, { skip: !slug });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Not found</div>;

  const initialValues = {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    images: data.images ?? [],
    categoryId: data.category?.id ?? ''
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <ProductForm initialValues={initialValues} />
    </div>
  );
}
