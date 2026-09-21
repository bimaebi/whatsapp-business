import { ChatItem } from '../types';

/**
 * Mendapatkan format waktu jam.menit (misal: 19.15) sesuai waktu laptop pengguna saat ini.
 */
export const getFormattedLaptopTime = (offsetMinutes = 0): string => {
  const date = new Date(Date.now() - offsetMinutes * 60 * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}.${minutes}`;
};

export const generateInitialChats = (): ChatItem[] => {
  return [];
};

export const INITIAL_CHATS: ChatItem[] = generateInitialChats();
