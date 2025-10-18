// components/ProductForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetCategoriesQuery, useCreateProductMutation, useUpdateProductMutation } from '../store/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Package, DollarSign, Image, Tag, FileText, Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Schema = z.object({
  id: z.string().uuid().optional(),
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

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
          
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {initialValues?.id ? 'Edit Product' : 'Create New Product'}
                </h1>
                <p className="text-gray-600 text-sm">
                  {initialValues?.id ? 'Update product details' : 'Add a new product to your inventory'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Package className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                {...register('name' as const)} 
                placeholder="Enter product name"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            {formState.errors.name && (
              <div className="mt-2 text-sm text-red-600 flex items-center">
                <span className="font-medium">{formState.errors.name.message}</span>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <div className="relative">
              <div className="absolute top-3 left-4 pointer-events-none">
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <textarea 
                {...register('description' as const)} 
                rows={4}
                placeholder="Enter product description"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
              />
            </div>
            {formState.errors.description && (
              <div className="mt-2 text-sm text-red-600 flex items-center">
                <span className="font-medium">{formState.errors.description.message}</span>
              </div>
            )}
          </div>

          {/* Price & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="number" 
                  step="any" 
                  {...register('price' as const, { valueAsNumber: true })} 
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
              {formState.errors.price && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="font-medium">{formState.errors.price.message}</span>
                </div>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag className="w-5 h-5 text-gray-400" />
                </div>
                <select 
                  {...register('categoryId' as const)} 
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Select a category</option>
                  {categories?.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              {formState.errors.categoryId && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="font-medium">{formState.errors.categoryId.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Image URLs Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URLs
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Image className="w-5 h-5 text-gray-400" />
              </div>
              <input
                defaultValue={(initialValues?.images || []).join(', ')}
                onBlur={(e) => {
                  const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                  setValue('images' as any, arr);
                }}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Separate multiple image URLs with commas
            </p>
            {formState.errors.images && (
              <div className="mt-2 text-sm text-red-600 flex items-center">
                <span className="font-medium">{(formState.errors.images as any)?.message}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t-2 border-gray-100">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </Link>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>{initialValues?.id ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  <span>{initialValues?.id ? 'Update Product' : 'Create Product'}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Make sure all image URLs are valid and accessible. Use high-quality images for better product presentation.
          </p>
        </div>
      </div>
    </div>
  );
}