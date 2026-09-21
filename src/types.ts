export interface Message {
  id: string;
  sender: 'incoming' | 'outgoing';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatItem {
  id: string;
  name: string;
  avatar?: string;
  time: string;
  lastMessage: string;
  lastMessageImage?: string;
  hasTimer?: boolean;
  status?: 'read' | 'delivered' | 'sent';
  unreadCount?: number;
  isGroup?: boolean;
  isFavorite?: boolean;
  messages: Message[];
}

export type FilterCategory = 'Semua' | 'Belum dibaca' | 'Favorit' | 'Grup';

export type MainTab = 'chat' | 'panggilan' | 'pembaruan' | 'fitur';
