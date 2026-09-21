import type { ChatItem } from '../types';

const CONTACTS_API_URL = '/api/contacts';

function normalizeChat(item: Partial<ChatItem>): ChatItem {
  return {
    id: item.id ?? `celin-${Date.now()}`,
    name: item.name ?? 'Tanpa nama',
    avatar: item.avatar ?? '',
    time: item.time ?? '00.00',
    lastMessage: item.lastMessage ?? '',
    lastMessageImage: typeof item.lastMessageImage === 'string' ? item.lastMessageImage : '',
    hasTimer: Boolean(item.hasTimer),
    status: item.status ?? 'delivered',
    unreadCount: Number(item.unreadCount ?? 0),
    isGroup: Boolean(item.isGroup),
    isFavorite: Boolean(item.isFavorite),
    messages: Array.isArray(item.messages)
      ? item.messages.map((message) => ({
          ...message,
          status: message.status ?? item.status ?? 'delivered',
        }))
      : [],
  };
}

async function readRemoteChats(): Promise<ChatItem[]> {
  try {
    const response = await fetch(CONTACTS_API_URL, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }

    return data.length > 0 ? data.map((item) => normalizeChat(item)) : [];
  } catch {
    return [];
  }
}

async function writeRemoteChats(chats: ChatItem[]) {
  const normalizedChats = chats.map((chat) => normalizeChat(chat));

  const response = await fetch(CONTACTS_API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(normalizedChats),
  });

  if (!response.ok) {
    throw new Error('Failed to persist chats');
  }

  return normalizedChats;
}

export async function loadStoredChats(): Promise<ChatItem[]> {
  return readRemoteChats();
}

export async function upsertChat(chat: ChatItem): Promise<ChatItem> {
  const currentChats = await readRemoteChats();
  const normalizedChat = normalizeChat(chat);
  const nextChats = currentChats.filter((item) => item.id !== normalizedChat.id);
  nextChats.push(normalizedChat);
  await writeRemoteChats(nextChats);
  return normalizedChat;
}

export async function deleteChat(id: string): Promise<ChatItem[]> {
  const currentChats = await readRemoteChats();
  const nextChats = currentChats.filter((chat) => chat.id !== id);
  await writeRemoteChats(nextChats);
  return nextChats;
}

export async function replaceAllChats(chats: ChatItem[]): Promise<ChatItem[]> {
  return writeRemoteChats(chats);
}
