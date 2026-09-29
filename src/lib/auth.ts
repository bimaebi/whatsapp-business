import type { ChatItem } from '../types';

export interface UserAccount {
  id: string;
  username: string;
  displayName: string;
  passwordHash: string;
}

export interface UserSettings {
  isDark: boolean;
  defaultMessage: string;
  defaultMessageImage: string;
  chatWallpaper: string;
}

export const DEFAULT_CHAT_WELCOME_MESSAGE = `📍 *SELAMAT! Nomor kamu terpilih sebagai ID VIP dengan winrate 97% di CUAN88* 🔥

🌹 *Link Daftar Hoki* ➡️  cutt.ly/DftrlgsgMaxW1n

_Dijamin WD Minimal 1 Juta di deposit pertama_ *Tidak WD? GARANSI SALDO KEMBALI!*

‼️ Ada kendala dalam pembuatan ID? *Chat ke wa pribadi aku* Klik ➡️  cutt.ly/WaJeniCn88

*_TERBUKTI SITUS RESMI NO 1 SE-ASIA_*‼️
⚠️ Cari kami di google ketik: *CUAN88*  ⚠️`;

const CURRENT_USER_KEY = 'wa-auth-current-user';
const ACCOUNTS_KEY = 'wa-auth-accounts';

function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

function readStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'http://localhost:3002';
  }

  const configured = (import.meta.env.VITE_API_BASE_URL ?? '').trim();
  if (configured) {
    return configured.replace(/\/$/, '');
  }

  return '';
}

async function fetchJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const requestUrl = baseUrl ? `${baseUrl}${path}` : path;

  const response = await fetch(requestUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function hashText(value: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-1', bytes);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  return '';
}

export function getStoredAccounts(): UserAccount[] {
  const storage = readStorage();
  if (!storage) {
    return [];
  }

  try {
    const raw = storage.getItem(ACCOUNTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredAccounts(accounts: UserAccount[]): void {
  const storage = readStorage();
  if (!storage) {
    return;
  }

  const current = getStoredAccounts();
  const merged = [...current];

  for (const account of accounts) {
    if (!account?.username) {
      continue;
    }

    const index = merged.findIndex((item) =>
      item.id === account.id || normalizeUsername(item.username) === normalizeUsername(account.username),
    );

    if (index >= 0) {
      merged[index] = { ...merged[index], ...account };
    } else {
      merged.push(account);
    }
  }

  storage.setItem(ACCOUNTS_KEY, JSON.stringify(merged));
}

export async function ensureSeedAccounts(): Promise<UserAccount[]> {
  try {
    const users = await fetchJson<UserAccount[]>('/api/users');
    if (Array.isArray(users) && users.length > 0) {
      saveStoredAccounts(users);
      return users;
    }

    const passwordHash = await hashText('123456');
    const seededAccounts: UserAccount[] = [
      {
        id: 'user-tester-1',
        username: 'tester1',
        displayName: 'Tester Satu',
        passwordHash,
      },
      {
        id: 'user-bima',
        username: 'bima',
        displayName: 'Bima',
        passwordHash,
      },
      {
        id: 'user-galang',
        username: 'galang',
        displayName: 'Galang',
        passwordHash,
      },
      {
        id: 'user-rijik',
        username: 'rijik',
        displayName: 'Rijik',
        passwordHash,
      },
    ];

    const created = await fetchJson<UserAccount[]>('/api/users/seed', {
      method: 'POST',
      body: JSON.stringify(seededAccounts),
    });
    saveStoredAccounts(created);
    return created;
  } catch {
    const cached = getStoredAccounts();
    return cached;
  }
}

export function setActiveUser(user: UserAccount | null): void {
  const storage = readStorage();
  if (!storage) {
    return;
  }

  if (!user) {
    storage.removeItem(CURRENT_USER_KEY);
    return;
  }

  storage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getActiveUser(accounts: UserAccount[] = getStoredAccounts()): UserAccount | null {
  const storage = readStorage();
  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(CURRENT_USER_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as UserAccount;
    return accounts.find((account) =>
      account.id === parsed.id || normalizeUsername(account.username) === normalizeUsername(parsed.username),
    ) ?? null;
  } catch {
    return null;
  }
}

export async function loginUser(username: string, password: string): Promise<UserAccount | null> {
  const trimmedUsername = normalizeUsername(username);

  let response: { user?: UserAccount | null; error?: string };
  try {
    response = await fetchJson<{ user?: UserAccount | null; error?: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: trimmedUsername, password }),
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Request failed: 401') {
      return null;
    }

    throw error;
  }

  const user = 'user' in response ? response.user ?? null : null;
  if (!user) {
    return null;
  }

  const freshAccounts = await ensureSeedAccounts();
  const normalizedUser = freshAccounts.find((account) =>
    account.id === user.id || normalizeUsername(account.username) === normalizeUsername(user.username),
  ) ?? user;

  setActiveUser(normalizedUser);
  saveStoredAccounts([normalizedUser]);
  return normalizedUser;
}

export async function registerUser(input: {
  username: string;
  password: string;
  displayName: string;
}): Promise<UserAccount | null> {
  const username = normalizeUsername(input.username);
  const displayName = input.displayName.trim();

  if (!username || !displayName) {
    return null;
  }

  try {
    const response = await fetchJson<{ user?: UserAccount | null; error?: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password: input.password,
        displayName,
      }),
    });

    const user = 'user' in response ? response.user ?? null : null;
    if (!user) {
      return null;
    }

    const freshAccounts = await ensureSeedAccounts();
    const normalizedUser = freshAccounts.find((account) =>
      account.id === user.id || normalizeUsername(account.username) === normalizeUsername(user.username),
    ) ?? user;

    setActiveUser(normalizedUser);
    saveStoredAccounts([normalizedUser]);
    return normalizedUser;
  } catch {
    return null;
  }
}

export function logoutCurrentUser(): void {
  setActiveUser(null);
}

export async function getUserSettings(userId: string): Promise<UserSettings> {
  try {
    const response = await fetchJson<{ isDark?: boolean; defaultMessage?: string; defaultMessageImage?: string; chatWallpaper?: string }>(`/api/users/${userId}/settings`);
    return {
      isDark: response.isDark ?? true,
      defaultMessage: response.defaultMessage || DEFAULT_CHAT_WELCOME_MESSAGE,
      defaultMessageImage: response.defaultMessageImage || '',
      chatWallpaper: response.chatWallpaper || '',
    };
  } catch {
    const storage = readStorage();
    if (!storage) {
      return {
        isDark: true,
        defaultMessage: DEFAULT_CHAT_WELCOME_MESSAGE,
        defaultMessageImage: '',
        chatWallpaper: '',
      };
    }

    const raw = storage.getItem(`wa-user-settings-${userId}`);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      isDark: parsed?.isDark ?? true,
      defaultMessage: parsed?.defaultMessage || DEFAULT_CHAT_WELCOME_MESSAGE,
      defaultMessageImage: parsed?.defaultMessageImage || '',
      chatWallpaper: parsed?.chatWallpaper || '',
    };
  }
}

export async function saveUserSettings(userId: string, settings: Partial<UserSettings>): Promise<void> {
  try {
    await fetchJson(`/api/users/${userId}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  } catch {
    const storage = readStorage();
    if (!storage) {
      return;
    }

    const current = await getUserSettings(userId);
    storage.setItem(
      `wa-user-settings-${userId}`,
      JSON.stringify({
        ...current,
        ...settings,
      }),
    );
  }
}

export async function loadUserChats(userId: string): Promise<ChatItem[]> {
  try {
    const response = await fetchJson<ChatItem[]>(`/api/users/${userId}/chats`);
    return Array.isArray(response) ? response : [];
  } catch {
    const storage = readStorage();
    if (!storage) {
      return [];
    }

    const raw = storage.getItem(`wa-user-chats-${userId}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  }
}

export async function saveUserChats(userId: string, chats: ChatItem[]): Promise<void> {
  try {
    await fetchJson(`/api/users/${userId}/chats`, {
      method: 'PUT',
      body: JSON.stringify(chats),
    });
  } catch {
    const storage = readStorage();
    if (!storage) {
      return;
    }

    storage.setItem(`wa-user-chats-${userId}`, JSON.stringify(chats));
  }
}
