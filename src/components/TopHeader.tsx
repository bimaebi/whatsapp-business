import React, { useState, useRef, useEffect } from 'react';
import { Camera, MoreVertical, Search, Moon, Sun } from 'lucide-react';

interface TopHeaderProps {
  searchQuery: string;
  isDark?: boolean;
  currentUser?: { displayName: string; username: string } | null;
  onToggleTheme?: () => void;
  onSearchChange: (query: string) => void;
  onSelectAll: () => void;
  onResetChats: () => void;
  totalChats: number;
  onLogout?: () => void;
}

interface SearchBarProps {
  searchQuery: string;
  isDark?: boolean;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  isDark = true,
  onSearchChange,
}) => (
  <div
    className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm transition-all ${
      isDark
        ? 'bg-[#1c222b] text-[#e9edef] focus-within:ring-1 focus-within:ring-[#00a884]'
        : 'bg-[#f0f2f5] text-[#111b21] focus-within:ring-1 focus-within:ring-[#008069]'
    }`}
  >
    <Search className="w-4 h-4 text-[#8696a0] shrink-0" />
    <input
      id="search-input"
      type="text"
      value={searchQuery}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Cari..."
      className="w-full bg-transparent outline-none placeholder-[#8696a0]"
    />
  </div>
);

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  isDark = true,
  currentUser,
  onToggleTheme,
  onSearchChange,
  onSelectAll,
  onResetChats,
  totalChats,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      id="wa-top-header"
      className={`px-4 pt-1 pb-2 transition-colors ${
        isDark ? 'bg-[#0D1015] text-[#e9edef]' : 'bg-white text-[#111b21]'
      }`}
    >
      <div className="flex items-center justify-between h-12">
        <div className="flex items-center gap-2">
          <h1 className="text-[22px] font-bold tracking-tight">
            WhatsApp
          </h1>
        </div>

        <div className="flex items-center gap-3 text-[#8696a0]">
          {/* {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5" />}
            </button>
          )} */}

          <button
            id="camera-btn"
            type="button"
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Kamera"
            onClick={() => alert('Kamera diaktifkan')}
          >
            <Camera className="w-5 h-5" />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              id="menu-options-btn"
              type="button"
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Opsi lainnya"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                id="header-dropdown-menu"
                className={`absolute right-0 top-10 w-56 rounded-xl shadow-2xl py-2 z-50 border animate-in fade-in zoom-in-95 duration-100 ${
                  isDark
                    ? 'bg-[#161c24] border-[#222a36] text-[#e9edef]'
                    : 'bg-white border-gray-100 text-[#111b21]'
                }`}
              >
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tambah pintasan chat
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lihat kontak
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tandai belum dibaca
                </button>
                <button
                  id="menu-select-all-btn"
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors flex items-center justify-between"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onSelectAll();
                  }}
                >
                  <span>Pilih semua</span>
                  <span className="text-xs opacity-70">({totalChats})</span>
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kunci obrolan
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tambah ke favorit
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bersihkan obrolan
                </button>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blokir
                </button>
                {onLogout && (
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout();
                    }}
                  >
                    Keluar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="mt-1">
        <SearchBar searchQuery={searchQuery} isDark={isDark} onSearchChange={onSearchChange} />
      </div>
    </header>
  );
};
