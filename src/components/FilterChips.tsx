import React from 'react';
import { Plus } from 'lucide-react';
import { FilterCategory } from '../types';

interface FilterChipsProps {
  activeFilter: FilterCategory;
  isDark?: boolean;
  onSelectFilter: (filter: FilterCategory) => void;
  unreadCount: number;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  activeFilter,
  isDark = true,
  onSelectFilter,
  unreadCount,
}) => {
  return (
    <div
      id="filter-chips-bar"
      className={`px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar transition-colors ${
        isDark ? 'bg-[#0D1015]' : 'bg-white border-gray-100'
      }`}
    >
      <button
        id="filter-all-btn"
        type="button"
        onClick={() => onSelectFilter('Semua')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
          activeFilter === 'Semua'
            ? isDark
              ? 'bg-[#FFFFFF50]/20 text-[#FFFFFF] font-semibold'
              : 'bg-[#d9fdd3] text-[#008069] font-semibold'
            : isDark
            ? 'bg-[#202c33] text-[#8696a0] hover:bg-[#2a3942]'
            : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
        }`}
      >
        Semua
      </button>

      <button
        id="filter-unread-btn"
        type="button"
        onClick={() => onSelectFilter('Belum dibaca')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
          activeFilter === 'Belum dibaca'
            ? isDark
              ? 'bg-[#00a884]/20 text-[#00a884] font-semibold'
              : 'bg-[#d9fdd3] text-[#008069] font-semibold'
            : isDark
            ? 'border-[0.5px] border-[#171A1F] text-[#8696a0] hover:bg-[#2a3942]'
            : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
        }`}
      >
        Belum dibaca
      </button>

      <button
        id="filter-favorites-btn"
        type="button"
        onClick={() => onSelectFilter('Favorit')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
          activeFilter === 'Favorit'
            ? isDark
              ? 'bg-[#00a884]/20 text-[#00a884] font-semibold'
              : 'bg-[#d9fdd3] text-[#008069] font-semibold'
            : isDark
            ? 'border-[0.5px] border-[#171A1F] text-[#8696a0] hover:bg-[#2a3942]'
            : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
        }`}
      >
        Favorit
      </button>

      <button
        id="filter-groups-btn"
        type="button"
        onClick={() => onSelectFilter('Grup')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
          activeFilter === 'Grup'
            ? isDark
              ? 'bg-[#00a884]/20 text-[#00a884] font-semibold'
              : 'bg-[#d9fdd3] text-[#008069] font-semibold'
            : isDark
            ? 'border-[0.5px] border-[#171A1F] text-[#8696a0] hover:bg-[#2a3942]'
            : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
        }`}
      >
        Grup
      </button>

      <button
        id="filter-add-btn"
        type="button"
        onClick={() => alert('Tambah filter khusus')}
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
          isDark
            ? 'border-[0.5px] border-[#171A1F] text-[#8696a0] hover:bg-[#2a3942]'
            : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
        }`}
        aria-label="Tambah filter"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
