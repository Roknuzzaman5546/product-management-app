// components/ProductCard.tsx
import Link from 'next/link';

export default function ProductCard({ product, onDelete }: { product: any; onDelete: () => void }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
      <div className="h-40 w-full rounded overflow-hidden bg-slate-100 flex items-center justify-center">
        <img src={product.images?.[0] ?? '/placeholder.png'} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="text-sm text-muted flex-1">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-sm text-muted">Price</div>
          <div className="font-semibold">${product.price}</div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/products/${product.slug}`} className="text-sm px-3 py-1 border rounded">View</Link>
          <button onClick={onDelete} className="text-sm px-3 py-1 bg-danger text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
