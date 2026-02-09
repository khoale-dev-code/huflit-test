import React, { memo } from 'react';
import { AlertTriangle, Clock, Flag } from 'lucide-react';

export const SubmitModal = memo(({ 
  visible, 
  unansweredCount, 
  saveError, 
  isOnline,
  isSubmitting,
  onConfirm, 
  onCancel 
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          <h2 className="text-2xl font-bold text-slate-900">Submit Test?</h2>
        </div>

        {unansweredCount > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Incomplete Answers</p>
            <p className="text-sm text-yellow-800">
              You still have <strong>{unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}</strong>.
            </p>
            <p className="text-xs text-yellow-700 mt-2">
              Unanswered questions will count as incorrect.
            </p>
          </div>
        )}

        {saveError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Save Error</p>
            <p className="text-xs text-red-800">
              {saveError} {isOnline ? 'Please check your connection.' : 'You are offline.'}
            </p>
          </div>
        )}

        <p className="text-slate-600 mb-6 text-sm">
          You are about to submit your answers. You cannot make changes after submission.
        </p>

        <div className="space-y-3">
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Flag className="w-4 h-4" />
                <span>Yes, Submit</span>
              </>
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full py-3 bg-slate-200 text-slate-900 rounded-lg font-bold hover:bg-slate-300 transition-colors disabled:opacity-50"
          >
            Continue Testing
          </button>
        </div>
      </div>
    </div>
  );
});

SubmitModal.displayName = 'SubmitModal';
export default SubmitModal;