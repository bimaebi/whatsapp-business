import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  isProcessing: boolean;
  isDark?: boolean;
  selectedCount: number;
  onCancel: () => void;
  onConfirmDelete: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  isProcessing,
  isDark = true,
  selectedCount,
  onCancel,
  onConfirmDelete,
}) => {
  if (!isOpen) return null;

  /* Loading State matching Screenshot_20260911_084351_Video Player.jpg */
  if (isProcessing) {
    return (
      <div
        id="delete-loading-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-[0.5px] transition-opacity animate-in fade-in duration-100"
      >
        <div
          id="delete-loading-card"
          className={`w-[85%] max-w-[325px] rounded-[26px] px-6 py-5 shadow-2xl flex items-center gap-5 select-none animate-in zoom-in-95 duration-150 ${
            isDark
              ? 'bg-[#181c22] text-[#e9edef] border border-white/5'
              : 'bg-white text-[#111b21] border border-black/5'
          }`}
        >
          {/* WhatsApp Native White Circular Arc Spinner - 100% matched to screenshot */}
          <div className="w-11 h-11 shrink-0 flex items-center justify-center">
            <svg
              className="w-11 h-11 animate-spin text-white"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="22"
                cy="22"
                r="17"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="75 35"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className={`text-[15.5px] font-normal tracking-tight ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
            Mohon tunggu sebentar
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      id="delete-confirmation-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-2xs transition-opacity animate-in fade-in duration-150"
    >
      <div
        id="delete-confirmation-dialog"
        className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-[#161c24] text-[#e9edef] border border-[#222a36]'
            : 'bg-white text-[#111b21]'
        }`}
      >
        {/* Confirmation dialog matching WhatsApp Android */}
        <div>
          <h3 className="text-[23px] font-regular mb-6 text-current">
            Hapus {selectedCount} obrolan?
          </h3>

          <div className="flex items-center justify-end gap-6 text-sm font-semibold tracking-wide">
            <button
              id="cancel-delete-btn"
              type="button"
              onClick={onCancel}
              className="text-[#1a8f47] hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              id="confirm-delete-btn"
              type="button"
              onClick={onConfirmDelete}
              className="text-[#1a8f47] hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Hapus semua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
