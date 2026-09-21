import React, { useState, useMemo, useEffect } from 'react';
import { TopHeader } from './components/TopHeader';
import { SelectionHeader } from './components/SelectionHeader';
import { AdBanner } from './components/AdBanner';
import { FilterChips } from './components/FilterChips';
import { ArchivedRow } from './components/ArchivedRow';
import { ChatListItem } from './components/ChatListItem';
import { ChatDetail } from './components/ChatDetail';
import { DeleteModal } from './components/DeleteModal';
import { BottomNav } from './components/BottomNav';
import { PanggilanView, PembaruanView, FiturView } from './components/OtherViews';
import { generateInitialChats, getFormattedLaptopTime } from './data/mockChats';
import { loadStoredChats, upsertChat, deleteChat, replaceAllChats } from './lib/sqlite';
import { ChatItem, FilterCategory, MainTab } from './types';
import { RotateCcw } from 'lucide-react';

const DEFAULT_CHAT_WELCOME_MESSAGE = `📍 *SELAMAT! Nomor kamu terpilih sebagai ID VIP dengan winrate 97% di CUAN88* 🔥

🌹 *Link Daftar Hoki* ➡️  cutt.ly/DftrlgsgMaxW1n

_Dijamin WD Minimal 1 Juta di deposit pertama_ *Tidak WD? GARANSI SALDO KEMBALI!*

‼️ Ada kendala dalam pembuatan ID? *Chat ke wa pribadi aku* Klik ➡️  cutt.ly/WaJeniCn88

*_TERBUKTI SITUS RESMI NO 1 SE-ASIA_*‼️
⚠️ Cari kami di google ketik: *CUAN88*  ⚠️`;
const DEFAULT_MESSAGE_STORAGE_KEY = 'whatsapp-default-message';
const DEFAULT_MESSAGE_IMAGE_STORAGE_KEY = 'whatsapp-default-message-image';

export default function App() {
  // Theme state: dark mode matching the screenshots
  const [isDark, setIsDark] = useState(true);

  // Main data state
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChat, setActiveChat] = useState<ChatItem | null>(null);

  // Filter & Navigation states
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Semua');
  const [activeTab, setActiveTab] = useState<MainTab>('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdBannerVisible, setIsAdBannerVisible] = useState(true);
  const [defaultMessage, setDefaultMessage] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_CHAT_WELCOME_MESSAGE;
    }

    const savedMessage = window.localStorage.getItem(DEFAULT_MESSAGE_STORAGE_KEY);
    return savedMessage || DEFAULT_CHAT_WELCOME_MESSAGE;
  });
  const [defaultMessageImage, setDefaultMessageImage] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.localStorage.getItem(DEFAULT_MESSAGE_IMAGE_STORAGE_KEY) || '';
  });

  // Multi-Selection state
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);

  // Chat detail animation state
  const [isChatDetailOpen, setIsChatDetailOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DEFAULT_MESSAGE_STORAGE_KEY, defaultMessage);
      window.localStorage.setItem(DEFAULT_MESSAGE_IMAGE_STORAGE_KEY, defaultMessageImage);
    }
  }, [defaultMessage, defaultMessageImage]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await loadStoredChats();
        if (isMounted) {
          setChats(data);
        }
      } catch {
        if (isMounted) {
          setChats([]);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter chats by search and category, then randomize which chats get blue checkmarks
  const filteredChats = useMemo(() => {
    const matchedChats = chats.filter((chat) => {
      const matchesSearch =
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (activeFilter === 'Belum dibaca') return chat.unreadCount && chat.unreadCount > 0;
      if (activeFilter === 'Favorit') return chat.isFavorite;
      if (activeFilter === 'Grup') return chat.isGroup;
      return true;
    });

    const sortedChats = [...matchedChats].sort((a, b) => b.time.localeCompare(a.time));

    const blueTickCount = Math.max(1, Math.min(sortedChats.length, Math.round(sortedChats.length * 0.2)));
    const blueTickIndexes = new Set<number>();

    while (blueTickIndexes.size < blueTickCount) {
      blueTickIndexes.add(Math.floor(Math.random() * sortedChats.length));
    }

    return sortedChats.map((chat, index) => {
      const nextStatus: ChatItem['status'] = chat.status === 'sent'
        ? 'sent'
        : blueTickIndexes.has(index)
          ? 'read'
          : 'delivered';

      return {
        ...chat,
        status: nextStatus,
      };
    });
  }, [chats, searchQuery, activeFilter]);


  // Handle Select All (matching 3-dot menu)
  const handleSelectAll = () => {
    setIsSelectionMode(true);
    const allIds = new Set(chats.map((c) => c.id));
    setSelectedIds(allIds);
  };

  // Toggle individual chat selection
  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    if (next.size === 0) {
      setIsSelectionMode(false);
    }
    setSelectedIds(next);
  };

  // Long press on a chat item
  const handleLongPress = (id: string) => {
    setIsSelectionMode(true);
    const next = new Set(selectedIds);
    next.add(id);
    setSelectedIds(next);
  };

  const handleOpenChat = (chat: ChatItem) => {
    setActiveChat(chat);
    setIsChatDetailOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatDetailOpen(false);
  };

  // Clear selection
  const handleClearSelection = () => {
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  // Trigger Delete confirmation modal
  const handleDeleteClick = () => {
    if (selectedIds.size > 0) {
      setIsDeleteModalOpen(true);
    }
  };

  useEffect(() => {
    if (!isChatDetailOpen && activeChat) {
      const timeoutId = window.setTimeout(() => {
        setActiveChat(null);
      }, 260);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [activeChat, isChatDetailOpen]);

  // Confirm delete with realistic processing spinner
  const handleConfirmDelete = async () => {
    setIsDeleteProcessing(true);

    try {
      const remainingChats = chats.filter((c) => !selectedIds.has(c.id));
      const savedChats = await replaceAllChats(remainingChats);
      setChats(savedChats);
    } finally {
      setIsDeleteProcessing(false);
      setIsDeleteModalOpen(false);
      setIsSelectionMode(false);
      setSelectedIds(new Set());
    }
  };

  // Restore demo chats
  const handleResetChats = async () => {
    const restoredChats = generateInitialChats();
    const savedChats = await replaceAllChats(restoredChats);
    setChats(savedChats);
    setIsSelectionMode(false);
    setSelectedIds(new Set());
    setIsAdBannerVisible(true);
  };

  // Send message in chat detail (default centang abu-abu & waktu laptop sekarang)
  const handleSendMessage = async (text: string) => {
    if (!activeChat) return;
    const timeStr = getFormattedLaptopTime(0);

    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: 'outgoing' as const,
      text,
      time: timeStr,
      status: 'delivered' as const,
    };

    const updated = {
      ...activeChat,
      messages: [...activeChat.messages, newMsg],
      lastMessage: text,
      time: timeStr,
    };

    setActiveChat(updated);
    setChats((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    await upsertChat(updated);
  };

  // Add new chat
  const handleNewChat = async () => {
    const nextNum = String(chats.filter((chat) => chat.id.startsWith('celin-')).length + 1).padStart(3, '0');
    const timeStr = getFormattedLaptopTime(0);
    const newContact: ChatItem = {
      id: `celin-${nextNum}`,
      name: `Celin ${nextNum}`,
      time: timeStr,
      lastMessage: defaultMessage,
      lastMessageImage: defaultMessageImage || '',
      status: 'delivered',
      messages: [],
    };

    const savedChat = await upsertChat(newContact);
    setChats((prev) => [savedChat, ...prev]);
  };

  const handleMetaAIClick = () => {
    alert('Meta AI: Asisten cerdas WhatsApp siap membantu Anda!');
  };

  const handleSaveChat = async (chat: ChatItem) => {
    const savedChat = await upsertChat(chat);
    setChats((prev) => {
      const filtered = prev.filter((item) => item.id !== savedChat.id);
      return [savedChat, ...filtered].sort((a, b) => a.name.localeCompare(b.name));
    });
    setActiveChat((current) => (current?.id === savedChat.id ? savedChat : current));
  };

  const handleDeleteChat = async (id: string) => {
    const savedChats = await deleteChat(id);
    setChats(savedChats);
    setActiveChat((current) => (current?.id === id ? null : current));
  };

  return (
    <div className="min-h-screen bg-[#0D1015] flex flex-col items-center justify-center font-sans antialiased text-[#e9edef]">
      {/* Mobile App Container - pure WhatsApp experience */}
      <div
        id="whatsapp-app-container"
        className={`w-full flex flex-col relative overflow-hidden transition-all shadow-2xl h-screen max-w-md ${
          isDark ? 'bg-[#0D1015]' : 'bg-white'
        }`}
      >
        {/* WhatsApp App Views */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <div
            className={`flex-1 flex flex-col h-full overflow-hidden transition-transform duration-300 ease-out ${
              activeChat && isChatDetailOpen ? '-translate-x-[18%]' : 'translate-x-0'
            } ${isDark ? 'bg-[#0D1015]' : 'bg-white'}`}
          >
            <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? 'bg-[#0D1015]' : 'bg-white'}`}>
              {/* Header: Regular or Selection Header */}
              {isSelectionMode ? (
                <SelectionHeader
                  selectedCount={selectedIds.size}
                  isDark={isDark}
                  onClearSelection={handleClearSelection}
                  onLabelClick={() => alert('Beri label untuk ' + selectedIds.size + ' obrolan')}
                  onDeleteClick={handleDeleteClick}
                  onArchiveClick={() => {
                    alert(`${selectedIds.size} obrolan diarsipkan`);
                    handleClearSelection();
                  }}
                  onMuteClick={() => {
                    alert(`${selectedIds.size} obrolan dibisukan`);
                    handleClearSelection();
                  }}
                  onPinClick={() => {
                    alert(`${selectedIds.size} obrolan disematkan`);
                    handleClearSelection();
                  }}
                />
              ) : (
                <TopHeader
                  searchQuery={searchQuery}
                  isDark={isDark}
                  onToggleTheme={() => setIsDark(!isDark)}
                  onSearchChange={setSearchQuery}
                  onSelectAll={handleSelectAll}
                  onResetChats={handleResetChats}
                  totalChats={chats.length}
                />
              )}

              {/* Chat tab content */}
              {activeTab === 'chat' && (
                <>
                  {/* Ad Banner */}
                  {isAdBannerVisible && (
                    <AdBanner
                      isDark={isDark}
                      onDismiss={() => setIsAdBannerVisible(false)}
                    />
                  )}

                  {/* Filter chips */}
                  <FilterChips
                    activeFilter={activeFilter}
                    isDark={isDark}
                    onSelectFilter={setActiveFilter}
                    unreadCount={6}
                  />

                  {/* Chat List Scroll Area */}
                  <div
                    id="chat-list-scroll-area"
                    className="flex-1 overflow-y-auto divide-y divide-transparent"
                  >
                    {/* Archived Row */}
                    <ArchivedRow
                      count={6}
                      isDark={isDark}
                      onClick={() => alert('Folder chat yang diarsipkan')}
                    />

                    {/* Chat items */}
                    {filteredChats.length > 0 ? (
                      <>
                        {filteredChats.map((chat) => (
                          <ChatListItem
                            key={chat.id}
                            chat={chat}
                            isDark={isDark}
                            isSelectionMode={isSelectionMode}
                            isSelected={selectedIds.has(chat.id)}
                            onToggleSelect={handleToggleSelect}
                            onOpenChat={handleOpenChat}
                            onLongPress={handleLongPress}
                          />
                        ))}
                        {/* Hint text matching IMG-20260910-WA0076.jpg */}
                        <div className="py-4 px-4 flex items-center justify-center text-center">
                          <p className="text-[12.5px] text-[#8696a0] select-none">
                            Sentuh dan tahan di obrolan untuk opsi lainnya
                          </p>
                        </div>
                      </>
                    ) : (
                      /* Empty state after deleting all */
                      <div className="flex flex-col items-center justify-center p-8 text-center my-auto">
                        {/* <div className="w-16 h-16 rounded-full bg-[#00a884]/10 flex items-center justify-center text-[#00a884] mb-3">
                          <RotateCcw className="w-8 h-8" />
                        </div>
                        <h3 className="text-base font-semibold text-current">
                          Tidak ada obrolan
                        </h3>
                        <p className="text-xs text-[#8696a0] mt-1 max-w-xs">
                          Semua obrolan telah berhasil dihapus.
                        </p>
                        <button
                          type="button"
                          onClick={handleResetChats}
                          className="mt-4 px-4 py-2 bg-[#00a884] text-[#111b21] text-xs font-bold rounded-full shadow-xs hover:bg-[#008f6f] transition-colors cursor-pointer"
                        >
                          Pulihkan Obrolan Demo
                        </button> */}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Other Tabs */}
              {activeTab === 'panggilan' && <PanggilanView isDark={isDark} />}
              {activeTab === 'pembaruan' && <PembaruanView isDark={isDark} />}
              {activeTab === 'fitur' && (
                <FiturView
                  isDark={isDark}
                  contacts={chats}
                  defaultMessage={defaultMessage}
                  defaultMessageImage={defaultMessageImage}
                  onSaveChat={handleSaveChat}
                  onDeleteChat={handleDeleteChat}
                  onSetDefaultMessage={(message, image) => {
                    setDefaultMessage(message);
                    setDefaultMessageImage(image || '');
                  }}
                />
              )}

              {/* Bottom Navigation Bar */}
              <BottomNav
                activeTab={activeTab}
                isDark={isDark}
                onChangeTab={setActiveTab}
                onNewChat={handleNewChat}
                onMetaAIClick={handleMetaAIClick}
                unreadChatCount={chats.length}
              />
            </div>
          </div>

          {activeChat && (
            <div
              className={`absolute inset-0 z-20 ${isChatDetailOpen ? 'chat-detail-enter' : 'chat-detail-exit'}`}
            >
              <ChatDetail
                chat={activeChat}
                isDark={isDark}
                onBack={handleCloseChat}
                onSendMessage={handleSendMessage}
              />
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          isProcessing={isDeleteProcessing}
          isDark={isDark}
          selectedCount={selectedIds.size}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
