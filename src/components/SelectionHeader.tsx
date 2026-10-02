import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SelectionHeaderProps {
  selectedCount: number;
  isDark?: boolean;
  onClearSelection: () => void;
  onLabelClick?: () => void;
  onDeleteClick: () => void;
  onArchiveClick: () => void;
  onMuteClick: () => void;
  onPinClick: () => void;
}

export const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  selectedCount,
  isDark = true,
  onClearSelection,
  onLabelClick,
  onDeleteClick,
  onArchiveClick,
  onMuteClick,
  onPinClick,
}) => {
  return (
    <header
      id="selection-header"
      className={`px-3.5 h-16 shrink-0 flex items-center justify-between shadow-xs sticky top-0 z-40 transition-colors select-none ${
        isDark ? 'bg-[#0D1015] text-[#e9edef]' : 'bg-white text-[#111b21]'
      }`}
    >
      {/* Left side: Back arrow and Selection Count */}
      <div className="flex items-center gap-4">
        <button
          id="close-selection-btn"
          type="button"
          onClick={onClearSelection}
          className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Batalkan pilihan"
        >
          <ArrowLeft className="w-5 h-5 text-current" />
        </button>
        <span
          id="selected-count"
          className="text-[19px] font-medium text-current select-none tracking-tight ml-1"
        >
          {selectedCount}
        </span>
      </div>

      {/* Right side: Exactly 6 Action Icons matching IMG-20260910-WA0077.jpg */}
      <div className="flex items-center gap-2.5 text-[#e9edef]">
        {/* 1. Label Obrolan (WhatsApp Business overlapping badge/contact cards) */}
        <button
          id="label-selection-btn"
          type="button"
          onClick={onLabelClick || (() => alert('Beri label obrolan'))}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title="Beri label obrolan"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Back card outline */}
            <path d="M4 8H3a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 3 21h10a1.5 1.5 0 0 0 1.5-1.5V18" />
            {/* Front card rounded rectangle */}
            <rect x="6" y="3" width="16" height="15" rx="2" />
            {/* Contact avatar circle (head) */}
            <circle cx="14" cy="8" r="2.2" />
            {/* Contact avatar body arc (torso) */}
            <path d="M10 15c.6-1.8 2.2-2.5 4-2.5s3.4.7 4 2.5" />
          </svg>
        </button>

        {/* 2. Pin / Sematkan (ic-push-pin) */}
        <button
          id="pin-selection-btn"
          type="button"
          onClick={onPinClick}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title="Sematkan"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>ic-push-pin</title>
            <path
              fill="currentColor"
              d="M16 5v7l1.7 1.7a1 1 0 0 1 .3.73V15c0 .28-.1.52-.29.71A.94.94 0 0 1 17 16h-4v5.85c0 .28-.1.52-.29.71a.94.94 0 0 1-.71.29.97.97 0 0 1-.71-.29.97.97 0 0 1-.29-.71V16H7a.97.97 0 0 1-.71-.29A.97.97 0 0 1 6 15v-.57a1.03 1.03 0 0 1 .3-.73L8 12V5a.97.97 0 0 1-.71-.29A.97.97 0 0 1 7 4c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h8c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 16 5Zm-7.15 9h6.3L14 12.85V5h-4v7.85L8.85 14Z"
            />
          </svg>
        </button>

        {/* 3. Trash / Hapus (ic-delete) */}
        <button
          id="delete-selection-btn"
          type="button"
          onClick={onDeleteClick}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title="Hapus"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>ic-delete</title>
            <path
              fill="currentColor"
              d="M7 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V6a.97.97 0 0 1-.71-.29A.97.97 0 0 1 4 5c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h4c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h4c.28 0 .52.1.71.29.2.19.29.43.29.71h4c.28 0 .52.1.71.29.2.19.29.43.29.71 0 .28-.1.52-.29.71A.94.94 0 0 1 19 6v13c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H7ZM17 6H7v13h10V6Zm-7 11c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71V9c0-.28-.1-.52-.29-.71A.97.97 0 0 0 10 8c-.28 0-.52.1-.71.29A.94.94 0 0 0 9 9v7c0 .28.1.52.29.71.19.2.43.29.71.29Zm4 0c.28 0 .52-.1.71-.29.2-.19.29-.43.29-.71V9c0-.28-.1-.52-.29-.71A.97.97 0 0 0 14 8c-.28 0-.52.1-.71.29A.94.94 0 0 0 13 9v7c0 .28.1.52.29.71.19.2.43.29.71.29Z"
            />
          </svg>
        </button>

        {/* 4. Mute / Bisukan (ic-notifications-off) */}
        {/* <button
          id="mute-selection-btn"
          type="button"
          onClick={onMuteClick}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title="Bisukan"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>ic-notifications-off</title>
            <path
              fill="currentColor"
              d="M16.15 19H5a.97.97 0 0 1-.71-.29A.97.97 0 0 1 4 18c0-.28.1-.52.29-.71.19-.2.43-.29.71-.29h1v-7a6.3 6.3 0 0 1 .85-3.15l1.5 1.5A4.2 4.2 0 0 0 8 10v7h6.2L2.1 4.9a.95.95 0 0 1-.27-.7c0-.28.09-.52.27-.7a.95.95 0 0 1 .7-.27c.28 0 .52.09.7.27l17 17a1 1 0 0 1 0 1.4.95.95 0 0 1-.7.28.95.95 0 0 1-.7-.28L16.15 19ZM13.5 4.2a5.77 5.77 0 0 1 3.25 2.11A5.86 5.86 0 0 1 18 10v2.75c0 .33-.1.58-.31.75a1.05 1.05 0 0 1-1.38-.01.98.98 0 0 1-.31-.77V10c0-1.1-.4-2.04-1.18-2.83a3.85 3.85 0 0 0-3.67-1.07c-.3.07-.57.15-.8.25-.28.12-.56.14-.84.08a1 1 0 0 1-.63-.48.96.96 0 0 1-.14-.69.72.72 0 0 1 .39-.54c.21-.11.44-.21.67-.3l.7-.22v-.7c0-.42.15-.77.44-1.06.29-.3.64-.44 1.06-.44.42 0 .77.15 1.06.44.3.29.44.64.44 1.06v.7ZM12 22c-.5 0-.95-.14-1.34-.41a1.3 1.3 0 0 1-.59-1.11c0-.14.06-.25.17-.34a.5.5 0 0 1 .36-.14h2.8c.13 0 .25.05.36.14.11.09.17.2.17.34 0 .46-.2.83-.6 1.1A2.2 2.2 0 0 1 12 22Z"
            />
          </svg>
        </button> */}

        {/* 5. Archive / Arsipkan (ic-archive) */}
        <button
          id="archive-selection-btn"
          type="button"
          onClick={onArchiveClick}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title="Arsipkan"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
          >
            <title>ic-archive</title>
            <path
              fill="currentColor"
              d="M5 21c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V6.5c0-.25.04-.47.13-.67.08-.2.19-.4.32-.58l1.4-1.7c.13-.18.3-.32.5-.41.2-.1.42-.14.65-.14h12c.23 0 .45.05.65.14.2.09.37.23.5.41l1.4 1.7c.13.18.24.38.32.58.09.2.13.42.13.67V19c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H5Zm.4-15h13.2l-.85-1H6.25L5.4 6ZM5 19h14V8H5v11Zm7-1.43c.13 0 .26-.02.38-.06a.88.88 0 0 0 .32-.21l2.6-2.6a.95.95 0 0 0 .27-.7.96.96 0 0 0-.27-.7.95.95 0 0 0-.7-.28c-.28 0-.52.1-.7.28l-.9.9V11c0-.28-.1-.52-.29-.71A.97.97 0 0 0 12 10c-.28 0-.52.1-.71.29A.94.94 0 0 0 11 11v3.2l-.9-.9a.95.95 0 0 0-.7-.28.95.95 0 0 0-.97.97c0 .3.09.53.27.71l2.6 2.6c.1.1.2.17.32.21.12.04.25.06.38.06Z"
            />
          </svg>
        </button>

        {/* 6. More / Opsi lainnya (3 Vertical Dots) */}
        <button
          id="more-selection-btn"
          type="button"
          onClick={() => alert('Opsi lainnya')}
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title="Lainnya"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="currentColor"
          >
            <circle cx="12" cy="5" r="1.7" />
            <circle cx="12" cy="12" r="1.7" />
            <circle cx="12" cy="19" r="1.7" />
          </svg>
        </button>
      </div>
    </header>
  );
};
