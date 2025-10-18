// components/ConfirmModal.tsx
import { AlertTriangle, X, Loader2 } from 'lucide-react';

export default function ConfirmModal({ open, title, description, onConfirm, onClose, loading }: any) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-slideUp">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 rounded-t-2xl p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Icon & Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white pr-8">
              {title}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">
            {description}
          </p>

          {/* Warning Message */}
          <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800 font-medium">
              ⚠️ This action cannot be undone
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button 
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          
          <button 
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}