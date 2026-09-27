import React from 'react';
import {
  Store,
  FolderKanban,
  Tag,
  Megaphone,
  Link,
  MessageCircle,
  Plus,
  CircleDashed,
  Search,
  MoreVertical,
  Upload,
  Save,
  Trash2,
  Pencil,
} from 'lucide-react';
import type { ChatItem } from '../types';

interface ViewProps {
  isDark?: boolean;
}

interface FiturViewProps extends ViewProps {
  contacts: ChatItem[];
  defaultMessage: string;
  defaultMessageImage?: string;
  onSaveChat: (chat: ChatItem) => Promise<void> | void;
  onDeleteChat: (id: string) => Promise<void> | void;
  onSetDefaultMessage: (message: string, image?: string) => void;
  onLogout?: () => void;
}

export const PanggilanView: React.FC<ViewProps> = ({ isDark = true }) => {
  return (
    <div
      id="panggilan-view"
      className={`flex-1 overflow-y-auto p-4 transition-colors ${
        isDark ? 'bg-[#0D1015] text-[#e9edef]' : 'bg-white text-[#111b21]'
      }`}
    >
      <div className={`flex items-center gap-4 py-2 border-b pb-4 ${isDark ? 'border-[#1c222b]' : 'border-gray-100'}`}>
        <div className="w-12 h-12 rounded-full bg-[#008069] flex items-center justify-center text-white">
          <Link className="w-5 h-5 -rotate-45" />
        </div>
        <div>
          <h3 className={`font-semibold text-[15px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
            Buat tautan panggilan
          </h3>
          <p className="text-xs text-[#8696a0]">
            Bagikan tautan untuk panggilan WhatsApp Anda
          </p>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-xs font-semibold text-[#8696a0] uppercase tracking-wider">
          Terbaru
        </span>
        <div className="mt-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-[#1c222b] text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                K
              </div>
              <div>
                <h4 className={`text-[15px] font-medium ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
                  Kantor Admin
                </h4>
                <p className="text-xs text-[#8696a0] flex items-center gap-1">
                  <span className="text-[#00a884]">↙</span> 10 September, 19.30
                </p>
              </div>
            </div>
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#00a884] cursor-pointer"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-call</title>
              <path
                fill="currentColor"
                d="M19.95 21c-2.08 0-4.14-.45-6.17-1.36a18.3 18.3 0 0 1-5.55-3.87 18.47 18.47 0 0 1-3.87-5.54C3.46 8.18 3 6.13 3 4.04A1.02 1.02 0 0 1 4.05 3H8.1c.23 0 .44.08.63.24a.9.9 0 0 1 .32.56l.65 3.5c.03.27.03.5-.02.67-.05.19-.15.35-.28.48L6.97 10.9c.34.62.73 1.21 1.2 1.79.45.57.96 1.13 1.5 1.66A17.59 17.59 0 0 0 13.1 17l2.35-2.35a1.61 1.61 0 0 1 1.3-.4l3.45.7c.23.07.43.19.57.36.16.18.23.37.23.59v4.05A1.02 1.02 0 0 1 19.95 21ZM6.03 9l1.64-1.65L7.25 5H5.03c.08.68.2 1.36.34 2.03.16.66.37 1.32.66 1.97Zm8.95 8.95a12.42 12.42 0 0 0 4.02 1v-2.2l-2.35-.48-1.67 1.68Z"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-[#1c222b] text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                C
              </div>
              <div>
                <h4 className={`text-[15px] font-medium ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
                  Customer Service
                </h4>
                <p className="text-xs text-[#8696a0] flex items-center gap-1">
                  <span className="text-red-500">↙</span> 9 September, 14.15
                </p>
              </div>
            </div>
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#00a884] cursor-pointer"
              preserveAspectRatio="xMidYMid meet"
              fill="currentColor"
            >
              <title>ic-videocam</title>
              <path
                fill="currentColor"
                d="M4 20c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V6c0-.55.2-1.02.59-1.41C2.98 4.19 3.45 4 4 4h12c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v4.5l3.15-3.15c.17-.17.35-.2.55-.13.2.09.3.25.3.48v8.6c0 .23-.1.4-.3.47-.2.09-.38.05-.55-.12L18 13.5V18c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H4Zm0-2h12V6H4v12Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PembaruanView: React.FC<ViewProps> = ({ isDark = true }) => {
  return (
    <div
      id="pembaruan-view"
      className={`flex-1 overflow-y-auto p-4 transition-colors ${
        isDark ? 'bg-[#0D1015] text-[#e9edef]' : 'bg-white text-[#111b21]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-bold text-[16px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>Status</h3>
        <button type="button" className="text-[#8696a0] p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4 py-2">
        <div className="relative">
          <div className={`w-13 h-13 rounded-full flex items-center justify-center font-semibold text-lg ${isDark ? 'bg-[#1c222b] text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
            S
          </div>
          <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#00a884] text-white flex items-center justify-center border-2 ${isDark ? 'border-[#0D1015]' : 'border-white'}`}>
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>
        <div>
          <h4 className={`font-semibold text-[15px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
            Status saya
          </h4>
          <p className="text-xs text-[#8696a0]">
            Ketuk untuk menambahkan pembaruan status
          </p>
        </div>
      </div>

      <div className="mt-6">
        <span className="text-xs font-semibold text-[#8696a0] uppercase tracking-wider">
          Pembaruan terkini
        </span>
        <div className="mt-3 flex items-center gap-4">
          <div className="w-13 h-13 rounded-full border-2 border-[#00a884] p-0.5">
            <div className="w-full h-full rounded-full bg-emerald-950/60 flex items-center justify-center text-emerald-400 font-bold text-sm">
              WA
            </div>
          </div>
          <div>
            <h4 className={`font-semibold text-[15px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
              Info Bisnis Official
            </h4>
            <p className="text-xs text-[#8696a0]">Hari ini 18.20</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FiturView: React.FC<FiturViewProps> = ({
  isDark = true,
  contacts,
  defaultMessage,
  defaultMessageImage = '',
  onSaveChat,
  onDeleteChat,
  onSetDefaultMessage,
  onLogout,
}) => {
  const getCurrentTime = (offsetSeconds = 0) => {
    const now = new Date();
    const shiftedTime = new Date(now.getTime() + offsetSeconds * 1000);
    const seconds = String(shiftedTime.getSeconds()).padStart(2, '0');

    return `${String(shiftedTime.getHours()).padStart(2, '0')}.${String(shiftedTime.getMinutes()).padStart(2, '0')}.${seconds}`;
  };

  const createBlankChat = (id?: string): ChatItem => ({
    id: id ?? `celin-${Date.now()}`,
    name: '',
    avatar: '',
    time: getCurrentTime(),
    lastMessage: defaultMessage,
    lastMessageImage: defaultMessageImage || '',
    status: 'delivered',
    unreadCount: 0,
    isGroup: false,
    isFavorite: false,
    messages: [],
  });

  const [form, setForm] = React.useState<ChatItem>(() => createBlankChat());
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [importText, setImportText] = React.useState('');
  const [isImporting, setIsImporting] = React.useState(false);
  const [isImportBlueTickEnabled, setIsImportBlueTickEnabled] = React.useState(false);
  const [defaultMessageDraft, setDefaultMessageDraft] = React.useState(defaultMessage);
  const [defaultMessageImageDraft, setDefaultMessageImageDraft] = React.useState(defaultMessageImage);

  React.useEffect(() => {
    setDefaultMessageDraft(defaultMessage);
  }, [defaultMessage]);

  React.useEffect(() => {
    setDefaultMessageImageDraft(defaultMessageImage);
  }, [defaultMessageImage]);

  const formatPhoneNumber = React.useCallback((rawPhone: string) => {
    const digits = rawPhone.replace(/\D/g, '');

    if (!digits) {
      return '';
    }

    let nationalDigits = digits;

    if (digits.startsWith('62')) {
      nationalDigits = digits.slice(2);
    } else if (digits.startsWith('0')) {
      nationalDigits = digits.slice(1);
    }

    if (nationalDigits.length < 8) {
      return `+62 ${nationalDigits}`;
    }

    const formatted = nationalDigits.length >= 11
      ? `${nationalDigits.slice(0, 3)}-${nationalDigits.slice(3, 7)}-${nationalDigits.slice(7)}`
      : nationalDigits.length === 10
        ? `${nationalDigits.slice(0, 3)}-${nationalDigits.slice(3, 6)}-${nationalDigits.slice(6)}`
        : nationalDigits.length === 9
          ? `${nationalDigits.slice(0, 3)}-${nationalDigits.slice(3, 6)}-${nationalDigits.slice(6)}`
          : nationalDigits;

    return `+62 ${formatted}`;
  }, []);

  const resetForm = React.useCallback(() => {
    setForm(createBlankChat());
    setEditingId(null);
  }, []);

  const tools = [
    { icon: Store, title: 'Profil bisnis', desc: 'Kelola nama, foto profil, dan data pengguna chat Anda' },
    { icon: FolderKanban, title: 'Katalog', desc: 'Tampilkan produk dan layanan Anda' },
    { icon: Megaphone, title: 'Iklan', desc: 'Jangkau lebih banyak pelanggan di FB & IG' },
    { icon: MessageCircle, title: 'Pesan salam', desc: 'Sambut pelanggan baru secara otomatis' },
    { icon: Tag, title: 'Label', desc: 'Atur chat dan pesan pelanggan Anda' },
  ];

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        avatar: String(reader.result ?? ''),
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (chat: ChatItem) => {
    setEditingId(chat.id);
    setForm({
      ...chat,
      avatar: chat.avatar ?? '',
      messages: chat.messages ?? [],
    });
  };

  const handleSave = async () => {
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      return;
    }

    setIsSaving(true);
    try {
      const nextChat: ChatItem = {
        ...form,
        id: editingId ?? (form.id || `celin-${contacts.length + 1}`),
        name: trimmedName,
        time: form.time || getCurrentTime(),
        lastMessage: form.lastMessage || defaultMessage,
        status: form.status ?? 'delivered',
        messages: (form.messages ?? []).map((message) => ({
          ...message,
          status: form.status ?? 'delivered',
        })),
      };

      await onSaveChat(nextChat);
      resetForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await onDeleteChat(id);
    if (editingId === id) {
      resetForm();
    }
  };

  const handleStatusToggle = React.useCallback(async (contact: ChatItem, nextStatus: ChatItem['status']) => {
    await onSaveChat({
      ...contact,
      status: nextStatus ?? 'delivered',
    });
  }, [onSaveChat]);

  const handleImportContacts = React.useCallback(async () => {
    const trimmedText = importText.trim();

    if (!trimmedText) {
      return;
    }

    setIsImporting(true);

    try {
      let rawEntries: Array<{ number?: string; image?: string | null } | string> = [];

      try {
        const parsed = JSON.parse(trimmedText);

        if (Array.isArray(parsed)) {
          rawEntries = parsed.map((item) => ({
            number: typeof item?.number === 'string' ? item.number : '',
            image: typeof item?.image === 'string' ? item.image : null,
          }));
        }
      } catch {
        rawEntries = trimmedText
          .split(/\n+/)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => line);
      }

      const existingKeys = new Set(contacts.map((contact) => contact.name.toLowerCase()));
      const importedNames = new Set<string>();

      for (const [index, rawEntry] of rawEntries.entries()) {
        const entry = typeof rawEntry === 'string'
          ? { number: rawEntry, image: null }
          : rawEntry;

        const rawPhone = (entry.number ?? '').replace(/^[\-•\s]+/, '').trim();
        const formattedPhone = formatPhoneNumber(rawPhone);

        if (!formattedPhone || importedNames.has(formattedPhone.toLowerCase())) {
          continue;
        }

        if (existingKeys.has(formattedPhone.toLowerCase())) {
          continue;
        }

        const importedContact: ChatItem = {
          id: `import-${formattedPhone.replace(/\D/g, '')}-${Date.now()}-${importedNames.size}`,
          name: formattedPhone,
          avatar: typeof entry.image === 'string' ? entry.image : '',
          time: getCurrentTime(index * 7),
          lastMessage: defaultMessage,
          lastMessageImage: defaultMessageImage || '',
          status: isImportBlueTickEnabled ? 'read' : 'delivered',
          unreadCount: 0,
          isGroup: false,
          isFavorite: false,
          messages: [],
        };

        importedNames.add(formattedPhone.toLowerCase());
        existingKeys.add(formattedPhone.toLowerCase());
        await onSaveChat(importedContact);
      }

      setImportText('');
    } finally {
      setIsImporting(false);
    }
  }, [contacts, defaultMessage, formatPhoneNumber, importText, isImportBlueTickEnabled, onSaveChat]);

  return (
    <div
      id="fitur-view"
      className={`flex-1 overflow-y-auto p-4 transition-colors ${
        isDark ? 'bg-[#0D1015] text-[#e9edef]' : 'bg-white text-[#111b21]'
      }`}
    >
      <div className="mb-4">
        <h3 className={`font-bold text-[18px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
          Kelola pengguna chat
        </h3>
        <p className="text-xs text-[#8696a0] mt-0.5">
          Tambah, edit, dan hapus pengguna chat yang tersimpan di data publik
        </p>
      </div>

      <div className={`rounded-2xl border p-4 ${isDark ? 'border-[#1c222b] bg-[#101820]' : 'border-gray-100 bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={`font-semibold text-[15px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
            Daftar pengguna chat
          </h4>
          <span className="text-[11px] text-[#8696a0]">{contacts.length} kontak</span>
        </div>

        <div className="space-y-3">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  isDark
                    ? 'border-[#1c222b] bg-[#0D1015]'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#00a884]/20 flex items-center justify-center shrink-0">
                  {contact.avatar ? (
                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-[#00a884]">{contact.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{contact.name}</p>
                  <p className="text-[11px] text-[#8696a0] truncate">{contact.lastMessage || 'Belum ada pesan'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`inline-flex items-center rounded-lg border p-0.5 ${
                      isDark ? 'border-[#1c222b] bg-[#0D1015]' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleStatusToggle(contact, 'sent')}
                      className={`min-w-7 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
                        contact.status === 'sent'
                          ? 'bg-[#00a884] text-[#111b21]'
                          : isDark
                            ? 'text-[#8696a0] hover:bg-[#1c222b]'
                            : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      aria-label={`Set centang 1 untuk ${contact.name}`}
                      title="Centang 1"
                    >
                      1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusToggle(contact, 'delivered')}
                      className={`min-w-7 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
                        contact.status !== 'sent'
                          ? 'bg-[#00a884] text-[#111b21]'
                          : isDark
                            ? 'text-[#8696a0] hover:bg-[#1c222b]'
                            : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      aria-label={`Set centang 2 untuk ${contact.name}`}
                      title="Centang 2"
                    >
                      2
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEdit(contact)}
                    className="rounded-lg border border-[#1c222b] p-2 text-[#00a884]"
                    aria-label={`Edit ${contact.name}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(contact.id)}
                    className="rounded-lg border border-[#1c222b] p-2 text-red-400"
                    aria-label={`Hapus ${contact.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#8696a0]">Belum ada kontak tersimpan.</p>
          )}
        </div>
      </div>

      <div className={`rounded-2xl border p-4 mt-4 ${isDark ? 'border-[#1c222b] bg-[#101820]' : 'border-gray-100 bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={`font-semibold text-[15px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
            Set default message
          </h4>
        </div>

        <label className="block">
          <span className="text-xs font-medium text-[#8696a0]">Pesan default untuk chat baru</span>
          <textarea
            value={defaultMessageDraft}
            onChange={(event) => setDefaultMessageDraft(event.target.value)}
            rows={6}
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none resize-none ${
              isDark
                ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                : 'border-gray-200 bg-white text-[#111b21]'
            }`}
            placeholder="Tulis pesan default Anda di sini"
          />
        </label>

        <label className="mt-3 block">
          <span className="text-xs font-medium text-[#8696a0]">Link gambar default message (opsional)</span>
          <input
            value={defaultMessageImageDraft}
            onChange={(event) => setDefaultMessageImageDraft(event.target.value)}
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
              isDark
                ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                : 'border-gray-200 bg-white text-[#111b21]'
            }`}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        {defaultMessageImageDraft && (
          <div className="mt-3 overflow-hidden rounded-xl border border-[#1c222b] bg-[#0D1015]">
            <img
              src={defaultMessageImageDraft}
              alt="Preview default message"
              className="h-28 w-full object-cover"
            />
          </div>
        )}

        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setDefaultMessageDraft(defaultMessage);
              setDefaultMessageImageDraft(defaultMessageImage);
            }}
            className={`rounded-xl border px-3 py-2 text-xs font-medium ${
              isDark
                ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                : 'border-gray-200 bg-white text-[#111b21]'
            }`}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => onSetDefaultMessage(defaultMessageDraft, defaultMessageImageDraft)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#00a884] px-3 py-2 text-xs font-semibold text-[#111b21]"
          >
            Set default message
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border p-4 mt-4 ${isDark ? 'border-[#1c222b] bg-[#101820]' : 'border-gray-100 bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className={`font-semibold text-[15px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
            Import kontak
          </h4>
        </div>

        <label className="block">
          <span className="text-xs font-medium text-[#8696a0]">Nomor WhatsApp (masing-masing baris)</span>
          <textarea
            value={importText}
            onChange={(event) => setImportText(event.target.value)}
            rows={6}
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none resize-none ${
              isDark
                ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                : 'border-gray-200 bg-white text-[#111b21]'
            }`}
            placeholder={"Contoh format teks:\n+6285226339960\n+6285718063716\n\nAtau paste JSON:\n[{\"number\":\"+6285226339960\",\"image\":null}]"}
          />
        </label>

        <div className="mt-3 flex items-center justify-between gap-3">
          <label
            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium ${
              isDark
                ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                : 'border-gray-200 bg-white text-[#111b21]'
            }`}
          >
            <span>Centang 2 biru</span>
            <input
              type="checkbox"
              checked={isImportBlueTickEnabled}
              onChange={(event) => setIsImportBlueTickEnabled(event.target.checked)}
              className="h-4 w-4 accent-[#00a884]"
            />
          </label>

          <button
            type="button"
            onClick={handleImportContacts}
            disabled={isImporting || !importText.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#00a884] px-3 py-2 text-xs font-semibold text-[#111b21] disabled:opacity-60"
          >
            {isImporting ? 'Mengimpor...' : 'Import kontak'}
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border p-4 mt-4 ${isDark ? 'border-[#1c222b] bg-[#101820]' : 'border-gray-100 bg-gray-50'}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#00a884]/20 flex items-center justify-center shrink-0">
            {form.avatar ? (
              <img src={form.avatar} alt="Foto profil" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-[#00a884]">{(form.name || 'U').charAt(0).toUpperCase()}</span>
            )}
          </div>

          <div className="flex-1">
            <h4 className={`font-semibold text-[16px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
              {editingId ? 'Edit pengguna chat' : 'Tambah pengguna chat'}
            </h4>
            <p className="text-xs text-[#8696a0] mt-0.5">
              {editingId ? 'Perbarui nama dan foto profil pengguna' : 'Buat kontak baru dengan nama dan foto profil'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[#8696a0]">Nama</span>
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                isDark
                  ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                  : 'border-gray-200 bg-white text-[#111b21]'
              }`}
              placeholder="Contoh: Celin 001"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-[#8696a0]">Link foto profil (opsional)</span>
            <input
              value={form.avatar}
              onChange={(event) => setForm((prev) => ({ ...prev, avatar: event.target.value }))}
              className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                isDark
                  ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                  : 'border-gray-200 bg-white text-[#111b21]'
              }`}
              placeholder="https://example.com/avatar.jpg"
            />
          </label>

          <div className="flex items-center gap-3 flex-wrap">
            <label
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium ${
                isDark
                  ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                  : 'border-gray-200 bg-white text-[#111b21]'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload foto profil
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>

            <label
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium ${
                isDark
                  ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                  : 'border-gray-200 bg-white text-[#111b21]'
              }`}
            >
              <span>Centang 2</span>
              <input
                type="checkbox"
                checked={form.status !== 'sent'}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    status: event.target.checked ? 'delivered' : 'sent',
                  }))
                }
                className="h-4 w-4 accent-[#00a884]"
              />
            </label>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00a884] px-3 py-2 text-xs font-semibold text-[#111b21] disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Menyimpan...' : editingId ? 'Update kontak' : 'Simpan kontak'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className={`rounded-xl border px-3 py-2 text-xs font-medium ${
                  isDark
                    ? 'border-[#1c222b] bg-[#0D1015] text-[#e9edef]'
                    : 'border-gray-200 bg-white text-[#111b21]'
                }`}
              >
                Batal
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`rounded-2xl border p-4 mt-4 ${isDark ? 'border-[#1c222b] bg-[#101820]' : 'border-gray-100 bg-gray-50'}`}>
        <button
          type="button"
          onClick={() => onLogout?.()}
          className="w-full rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
        >
          Logout
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {tools.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-start gap-4 p-2.5 rounded-xl cursor-pointer transition-colors border ${
                isDark
                  ? 'border-[#1c222b] hover:bg-[#161c24]'
                  : 'border-gray-100 hover:bg-gray-50'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-[#00a884]/20 text-[#00a884] flex items-center justify-center shrink-0 mt-0.5">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`font-semibold text-[15px] ${isDark ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
                  {item.title}
                </h4>
                <p className="text-xs text-[#8696a0] mt-0.5 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
