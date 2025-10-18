// components/Pagination.tsx
export default function Pagination({ page, setPage, pageSize }: { page: number; setPage: (p: number) => void; pageSize: number }) {
  return (
    <div className="flex items-center gap-2">
      <button className="px-3 py-1 border rounded" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
      <div className="px-3 py-1 border rounded">Page {page}</div>
      <button className="px-3 py-1 border rounded" onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
