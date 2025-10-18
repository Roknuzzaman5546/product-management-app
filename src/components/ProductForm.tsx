// components/ProductForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetCategoriesQuery, useCreateProductMutation, useUpdateProductMutation } from '../store/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Schema = z.object({
  name: z.string().min(2,'Name too short'),
  description: z.string().min(2,'Description too short'),
  price: z.number().positive('Price must be > 0'),
  images: z.array(z.string().url()).min(1, 'At least one image URL'),
  categoryId: z.string().uuid('Select a category'),
});
type FormValues = z.infer<typeof Schema>;

export default function ProductForm({ initialValues }: { initialValues?: Partial<FormValues> }) {
  const router = useRouter();
  const { data: categories } = useGetCategoriesQuery({});
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { register, handleSubmit, setValue, formState } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: initialValues as any,
  });

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([k, v]) => setValue(k as any, v as any));
    }
  }, [initialValues, setValue]);

  async function onSubmit(data: FormValues) {
    try {
      if (initialValues?.id) {
        await updateProduct({ id: initialValues.id as string, body: data }).unwrap();
      } else {
        await createProduct(data).unwrap();
      }
      router.push('/products');
    } catch (err: any) {
      alert('Failed: ' + (err?.data?.message ?? String(err)));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input {...register('name' as const)} className="w-full border p-2 rounded" />
        {formState.errors.name && <div className="text-danger text-sm">{formState.errors.name.message}</div>}
      </div>

      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea {...register('description' as const)} className="w-full border p-2 rounded" />
        {formState.errors.description && <div className="text-danger text-sm">{formState.errors.description.message}</div>}
      </div>

      <div>
        <label className="block text-sm mb-1">Price</label>
        <input type="number" step="any" {...register('price' as const, { valueAsNumber: true })} className="w-full border p-2 rounded" />
        {formState.errors.price && <div className="text-danger text-sm">{formState.errors.price.message}</div>}
      </div>

      <div>
        <label className="block text-sm mb-1">Image URLs (comma separated)</label>
        <input
          defaultValue={(initialValues?.images || []).join(', ')}
          onBlur={(e) => {
            const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
            // set the images array in form
            setValue('images' as any, arr);
          }}
          className="w-full border p-2 rounded"
          placeholder="https://... , https://..."
        />
        {formState.errors.images && <div className="text-danger text-sm">{(formState.errors.images as any)?.message}</div>}
      </div>

      <div>
        <label className="block text-sm mb-1">Category</label>
        <select {...register('categoryId' as const)} className="w-full border p-2 rounded">
          <option value="">Select a category</option>
          {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {formState.errors.categoryId && <div className="text-danger text-sm">{formState.errors.categoryId.message}</div>}
      </div>

      <div className="flex justify-end gap-2">
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded" disabled={isCreating || isUpdating}>
          {initialValues?.id ? (isUpdating ? 'Updating...' : 'Update') : (isCreating ? 'Creating...' : 'Create')}
        </button>
      </div>
    </form>
  );
}
