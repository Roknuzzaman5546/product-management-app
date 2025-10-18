// components/ConfirmModal.tsx
export default function ConfirmModal({ open, title, description, onConfirm, onClose, loading }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted mt-2">{description}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="px-3 py-2 bg-danger text-white rounded">{loading ? 'Deleting...' : 'Delete'}</button>
        </div>
      </div>
    </div>
  );
}
