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
import {
  DEFAULT_CHAT_WELCOME_MESSAGE,
  ensureSeedAccounts,
  getActiveUser,
  getUserSettings,
  loadUserChats,
  loginUser,
  logoutCurrentUser,
  registerUser,
  saveUserChats,
  saveUserSettings,
  type UserAccount,
} from './lib/auth';
import { ChatItem, FilterCategory, MainTab } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({ username: '', password: '', displayName: '' });
  const [authError, setAuthError] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);

  const [isDark, setIsDark] = useState(true);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChat, setActiveChat] = useState<ChatItem | null>(null);

  const [activeFilter, setActiveFilter] = useState<FilterCategory>('Semua');
  const [activeTab, setActiveTab] = useState<MainTab>('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdBannerVisible, setIsAdBannerVisible] = useState(true);
  const [defaultMessage, setDefaultMessage] = useState<string>(DEFAULT_CHAT_WELCOME_MESSAGE);
  const [defaultMessageImage, setDefaultMessageImage] = useState<string>('');
  const [chatWallpaper, setChatWallpaper] = useState<string>('');

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);
  const [isChatDetailOpen, setIsChatDetailOpen] = useState(false);

  const applyUserSession = async (user: UserAccount) => {
    const settings = await getUserSettings(user.id);
    setCurrentUser(user);
    setIsDark(settings.isDark);
    setDefaultMessage(settings.defaultMessage);
    setDefaultMessageImage(settings.defaultMessageImage);
    setChatWallpaper(settings.chatWallpaper);
    setChats(await loadUserChats(user.id));
    setActiveChat(null);
    setIsChatDetailOpen(false);
    setSearchQuery('');
    setActiveFilter('Semua');
    setIsSelectionMode(false);
    setSelectedIds(new Set());
  };

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      await ensureSeedAccounts();
      if (!isMounted) {
        return;
      }

      const activeUser = getActiveUser();
      if (activeUser) {
        void applyUserSession(activeUser);
      }
      setIsAuthReady(true);
    };

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    void saveUserSettings(currentUser.id, {
      isDark,
      defaultMessage,
      defaultMessageImage,
      chatWallpaper,
    });
  }, [currentUser, isDark, defaultMessage, defaultMessageImage, chatWallpaper]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    void saveUserChats(currentUser.id, chats);
  }, [currentUser, chats]);

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

  const handleConfirmDelete = async () => {
    setIsDeleteProcessing(true);

    try {
      const remainingChats = chats.filter((c) => !selectedIds.has(c.id));
      setChats(remainingChats);
    } finally {
      setIsDeleteProcessing(false);
      setIsDeleteModalOpen(false);
      setIsSelectionMode(false);
      setSelectedIds(new Set());
    }
  };

  const handleResetChats = async () => {
    setChats(generateInitialChats());
    setIsSelectionMode(false);
    setSelectedIds(new Set());
    setIsAdBannerVisible(true);
  };

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
  };

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

    setChats((prev) => [newContact, ...prev]);
  };

  const handleMetaAIClick = () => {
    alert('Meta AI: Asisten cerdas WhatsApp siap membantu Anda!');
  };

  const handleSaveChat = async (chat: ChatItem) => {
    setChats((prev) => {
      const filtered = prev.filter((item) => item.id !== chat.id);
      return [chat, ...filtered].sort((a, b) => a.name.localeCompare(b.name));
    });
    setActiveChat((current) => (current?.id === chat.id ? chat : current));
  };

  const handleDeleteChat = async (id: string) => {
    setChats((prev) => prev.filter((item) => item.id !== id));
    setActiveChat((current) => (current?.id === id ? null : current));
  };

  const handleLogin = async () => {
    let user: UserAccount | null;
    try {
      user = await loginUser(authForm.username, authForm.password);
    } catch {
      setAuthError('Server login tidak dapat dihubungi. Pastikan server API aktif, lalu coba lagi.');
      return;
    }

    if (!user) {
      setAuthError('Username atau password salah. Akun demo: tester1, bima, galang, atau rijik — password: 123456.');
      return;
    }

    setAuthError('');
    setCurrentUser(user);
    const settings = await getUserSettings(user.id);
    setIsDark(settings.isDark);
    setDefaultMessage(settings.defaultMessage);
    setDefaultMessageImage(settings.defaultMessageImage);
    setChatWallpaper(settings.chatWallpaper);
    setChats(await loadUserChats(user.id));
    setAuthForm({ username: '', password: '', displayName: '' });
  };

  const handleRegister = async () => {
    if (!authForm.username.trim() || !authForm.password.trim() || !authForm.displayName.trim()) {
      setAuthError('Username, nama, dan password harus diisi.');
      return;
    }

    const createdUser = await registerUser({
      username: authForm.username,
      password: authForm.password,
      displayName: authForm.displayName,
    });

    if (!createdUser) {
      setAuthError('Username sudah dipakai, silakan pilih nama lain.');
      return;
    }

    setAuthError('');
    setCurrentUser(createdUser);
    const settings = await getUserSettings(createdUser.id);
    setIsDark(settings.isDark);
    setDefaultMessage(settings.defaultMessage);
    setDefaultMessageImage(settings.defaultMessageImage);
    setChatWallpaper(settings.chatWallpaper);
    setChats(await loadUserChats(createdUser.id));
    setAuthForm({ username: '', password: '', displayName: '' });
  };

  const handleLogout = () => {
    logoutCurrentUser();
    setCurrentUser(null);
    setAuthForm({ username: '', password: '', displayName: '' });
    setAuthError('');
    setIsSelectionMode(false);
    setSelectedIds(new Set());
    setActiveChat(null);
    setChatWallpaper('');
    setChats([]);
  };

  if (!isAuthReady || !currentUser) {
    return (
      <div className="min-h-screen bg-[#0D1015] flex items-center justify-center px-4 font-sans antialiased text-[#e9edef]">
        <div className="w-full max-w-sm rounded-3xl bg-[#111b21] p-6 shadow-2xl border border-[#2a3942]">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#00a884] text-2xl font-bold text-[#061811]">
              W
            </div>
            <h1 className="text-2xl font-bold">WhatsApp Business</h1>
            <p className="mt-1 text-sm text-[#8696a0]">
              {authMode === 'login' ? 'Masuk ke akun Anda' : 'Buat akun baru'}
            </p>
          </div>

          {authMode === 'register' && (
            <input
              type="text"
              value={authForm.displayName}
              onChange={(event) => setAuthForm((prev) => ({ ...prev, displayName: event.target.value }))}
              placeholder="Nama lengkap"
              className="mb-3 w-full rounded-xl border border-[#2a3942] bg-[#0d1015] px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-[#8696a0]"
            />
          )}

          <input
            type="text"
            value={authForm.username}
            onChange={(event) => setAuthForm((prev) => ({ ...prev, username: event.target.value }))}
            placeholder="Username"
            className="mb-3 w-full rounded-xl border border-[#2a3942] bg-[#0d1015] px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-[#8696a0]"
          />

          <input
            type="password"
            value={authForm.password}
            onChange={(event) => setAuthForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder="Password"
            className="mb-4 w-full rounded-xl border border-[#2a3942] bg-[#0d1015] px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-[#8696a0]"
          />

          {authError && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={authMode === 'login' ? handleLogin : handleRegister}
            className="mb-3 w-full rounded-xl bg-[#00a884] px-3 py-2.5 text-sm font-semibold text-[#061811] transition hover:bg-[#1fcb9f]"
          >
            {authMode === 'login' ? 'Masuk' : 'Daftar'}
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode((prev) => (prev === 'login' ? 'register' : 'login'));
              setAuthError('');
            }}
            className="w-full rounded-xl border border-[#2a3942] px-3 py-2.5 text-sm text-[#e9edef] transition hover:bg-[#1c222b]"
          >
            {authMode === 'login' ? 'Buat akun baru' : 'Sudah punya akun? Masuk'}
          </button>

          <div className="mt-5 rounded-xl border border-[#2a3942] bg-[#0d1015] px-3 py-2 text-[11px] leading-5 text-[#8696a0]">
            Demo akun: <span className="font-semibold text-[#d1d5db]">tester1</span> atau <span className="font-semibold text-[#d1d5db]">bima</span>
            <br />
            Password: <span className="font-semibold text-[#d1d5db]">123456</span>
          </div>
        </div>
      </div>
    );
  }

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
                  currentUser={currentUser}
                  onToggleTheme={() => setIsDark((prev) => !prev)}
                  onSearchChange={setSearchQuery}
                  onSelectAll={handleSelectAll}
                  onResetChats={handleResetChats}
                  totalChats={chats.length}
                  onLogout={handleLogout}
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
                  chatWallpaper={chatWallpaper}
                  onSetDefaultMessage={(message, image) => {
                    setDefaultMessage(message);
                    setDefaultMessageImage(image || '');
                  }}
                  onSetChatWallpaper={(wallpaper) => setChatWallpaper(wallpaper || '')}
                  onLogout={handleLogout}
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
                chatWallpaper={chatWallpaper}
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
