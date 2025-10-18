// app/products/new/page.tsx
import ProductForm from '../../../components/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      <ProductForm />
    </div>
  );
}
