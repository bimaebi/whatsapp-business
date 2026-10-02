import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { createServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3002;
const httpServer = createServer(app);
const webSocketServer = new WebSocketServer({ server: httpServer, path: '/ws' });
const chatSubscribers = new Map();
const usersPath = path.join(__dirname, 'public', 'users.json');
const contactsPath = path.join(__dirname, 'public', 'contacts.json');
const importLogsPath = path.join(__dirname, 'public', 'import-logs.json');
let importLogWriteQueue = Promise.resolve();
let userMutationQueue = Promise.resolve();

const defaultSettings = {
  isDark: true,
  defaultMessage: `📍 *SELAMAT! Nomor kamu terpilih sebagai ID VIP dengan winrate 97% di CUAN88* 🔥

🌹 *Link Daftar Hoki* ➡️  cutt.ly/DftrlgsgMaxW1n

_Dijamin WD Minimal 1 Juta di deposit pertama_ *Tidak WD? GARANSI SALDO KEMBALI!*

‼️ Ada kendala dalam pembuatan ID? *Chat ke wa pribadi aku* Klik ➡️  cutt.ly/WaJeniCn88

*_TERBUKTI SITUS RESMI NO 1 SE-ASIA_*‼️
⚠️ Cari kami di google ketik: *CUAN88*  ⚠️`,
  defaultMessageImage: '',
  chatWallpaper: '',
};

function hashPassword(value) {
  return crypto.createHash('sha1').update(String(value)).digest('hex');
}

function passwordMatches(value, storedHash) {
  const rawValue = String(value ?? '');
  const sha1Hash = hashPassword(rawValue);
  const sha256Hash = crypto.createHash('sha256').update(rawValue).digest('hex');
  return storedHash === sha1Hash || storedHash === sha256Hash;
}

async function readUsersFile() {
  try {
    const raw = await fs.readFile(usersPath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : Array.isArray(parsed.users) ? parsed.users : [];
  } catch {
    return [];
  }
}

async function writeUsersFile(users) {
  const nextContent = JSON.stringify({ users }, null, 2);

  try {
    const currentContent = await fs.readFile(usersPath, 'utf8');
    if (currentContent === nextContent) {
      return;
    }
  } catch {
    // File does not exist yet; write it normally.
  }

  await fs.writeFile(usersPath, nextContent, 'utf8');
}

function serializeUserMutation(operation) {
  const queuedOperation = userMutationQueue.then(operation, operation);
  userMutationQueue = queuedOperation.then(() => undefined, () => undefined);
  return queuedOperation;
}

function sanitizeUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

async function ensureSeedUsers() {
  const users = await readUsersFile();
  const normalizedUsers = users
    .map((user) => ({
      ...user,
      id: String(user.id || `user-${Date.now()}-${Math.random().toString(16).slice(2)}`),
      username: String(user.username || '').trim().toLowerCase(),
      displayName: String(user.displayName || '').trim() || 'User',
      chats: Array.isArray(user.chats) ? user.chats : [],
      settings: { ...defaultSettings, ...(user.settings || {}) },
    }))
    .filter((user) => user.username && user.username.length > 0);

  const uniqueUsers = normalizedUsers.filter((user, index, list) =>
    list.findIndex((item) => item.username === user.username) === index,
  );

  if (uniqueUsers.length > 0) {
    const persistedUsers = uniqueUsers.map((user) => ({
      ...user,
      passwordHash: String(user.passwordHash || ''),
      settings: { ...defaultSettings, ...(user.settings || {}) },
    }));

    return persistedUsers;
  }

  const seeded = [
    {
      id: 'user-tester-1',
      username: 'tester1',
      displayName: 'Tester Satu',
      passwordHash: hashPassword('123456'),
      chats: [],
      settings: { ...defaultSettings },
    },
    {
      id: 'user-bima',
      username: 'bima',
      displayName: 'Bima',
      passwordHash: hashPassword('123456'),
      chats: [],
      settings: { ...defaultSettings },
    },
    {
      id: 'user-galang',
      username: 'galang',
      displayName: 'Galang',
      passwordHash: hashPassword('123456'),
      chats: [],
      settings: { ...defaultSettings },
    },
    {
      id: 'user-rijik',
      username: 'rijik',
      displayName: 'Rijik',
      passwordHash: hashPassword('123456'),
      chats: [],
      settings: { ...defaultSettings },
    },
  ];

  await writeUsersFile(seeded);
  return seeded;
}

app.use(express.json({ limit: '10mb' }));

function broadcastChats(userId, chats) {
  const subscribers = chatSubscribers.get(userId);
  if (!subscribers) {
    return;
  }

  const message = JSON.stringify({ type: 'chats:updated', userId, chats });
  for (const client of subscribers) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

webSocketServer.on('connection', async (socket, request) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const userId = requestUrl.searchParams.get('userId');
  if (!userId) {
    socket.close(1008, 'userId is required');
    return;
  }

  const subscribers = chatSubscribers.get(userId) ?? new Set();
  subscribers.add(socket);
  chatSubscribers.set(userId, subscribers);

  socket.on('close', () => {
    subscribers.delete(socket);
    if (subscribers.size === 0) {
      chatSubscribers.delete(userId);
    }
  });

  try {
    const user = (await ensureSeedUsers()).find((item) => item.id === userId);
    if (user && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'chats:updated',
        userId,
        chats: Array.isArray(user.chats) ? user.chats : [],
      }));
    }
  } catch {
    // The regular API request remains the fallback if the initial sync fails.
  }
});

app.get('/api/contacts', async (_req, res) => {
  try {
    const raw = await fs.readFile(contactsPath, 'utf8');
    const parsed = JSON.parse(raw);
    res.json(Array.isArray(parsed) ? parsed : []);
  } catch {
    res.json([]);
  }
});

app.put('/api/contacts', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [];
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true, count: data.length });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to write contacts.' });
  }
});

app.get('/api/import-logs', async (_req, res) => {
  try {
    const raw = await fs.readFile(importLogsPath, 'utf8');
    const parsed = JSON.parse(raw);
    return res.json(Array.isArray(parsed) ? parsed : []);
  } catch {
    return res.json([]);
  }
});

app.post('/api/import-logs', async (req, res) => {
  try {
    const log = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      username: String(req.body?.username || 'Unknown').trim().slice(0, 100),
      numberCount: Math.max(0, Math.min(100000, Number(req.body?.numberCount) || 0)),
      text: String(req.body?.text || '').slice(0, 20000),
      ip: String(req.ip || req.socket.remoteAddress || 'Unknown').slice(0, 100),
      device: String(req.get('user-agent') || 'Unknown').slice(0, 500),
    };

    const writeLog = async () => {
      const raw = await fs.readFile(importLogsPath, 'utf8').catch(() => '[]');
      const parsed = JSON.parse(raw);
      const currentLogs = Array.isArray(parsed) ? parsed : [];
      const nextLogs = [log, ...currentLogs].slice(0, 500);
      await fs.writeFile(importLogsPath, JSON.stringify(nextLogs, null, 2), 'utf8');
    };

    const queuedWrite = importLogWriteQueue.then(writeLog, writeLog);
    importLogWriteQueue = queuedWrite.then(() => undefined, () => undefined);
    await queuedWrite;
    return res.status(201).json(log);
  } catch {
    return res.status(500).json({ error: 'Failed to save import log' });
  }
});

app.get('/api/users', async (_req, res) => {
  try {
    const users = await ensureSeedUsers();
    res.json(users.map((user) => sanitizeUser(user)));
  } catch {
    res.status(500).json({ error: 'Failed to load users' });
  }
});

app.post('/api/users/seed', async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : [];
    if (payload.length === 0) {
      const users = await ensureSeedUsers();
      res.json(users.map((user) => sanitizeUser(user)));
      return;
    }

    const users = payload.map((user) => ({
      id: user.id || `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      username: String(user.username || '').trim(),
      displayName: String(user.displayName || '').trim(),
      passwordHash: String(user.passwordHash || ''),
      chats: Array.isArray(user.chats) ? user.chats : [],
      settings: {
        isDark: Boolean(user.settings?.isDark),
        defaultMessage: user.settings?.defaultMessage || defaultSettings.defaultMessage,
        defaultMessageImage: user.settings?.defaultMessageImage || '',
        chatWallpaper: user.settings?.chatWallpaper || '',
      },
    }));

    await serializeUserMutation(() => writeUsersFile(users));
    res.json(users.map((user) => sanitizeUser(user)));
  } catch {
    res.status(500).json({ error: 'Failed to seed users' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const users = await ensureSeedUsers();
    const normalizedUsername = String(username || '').trim().toLowerCase();
    const user = users.find((item) => item.username.toLowerCase() === normalizedUsername);

    if (!user || !passwordMatches(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    return res.json({ user: sanitizeUser(user) });
  } catch {
    return res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, displayName } = req.body || {};
    const cleanUsername = String(username || '').trim().toLowerCase();
    const cleanDisplayName = String(displayName || '').trim();

    if (!cleanUsername || !cleanDisplayName || !password) {
      return res.status(400).json({ error: 'Username, display name, and password are required' });
    }

    const result = await serializeUserMutation(async () => {
      const users = await ensureSeedUsers();
      const exists = users.some((user) => user.username.toLowerCase() === cleanUsername);
      if (exists) {
        return { status: 409, body: { error: 'Username already exists' } };
      }

      const newUser = {
        id: `user-${Date.now()}`,
        username: cleanUsername,
        displayName: cleanDisplayName,
        passwordHash: hashPassword(String(password)),
        chats: [],
        settings: { ...defaultSettings },
      };

      await writeUsersFile([...users, newUser]);
      return { status: 201, body: { user: sanitizeUser(newUser) } };
    });
    return res.status(result.status).json(result.body);
  } catch {
    return res.status(500).json({ error: 'Registration failed' });
  }
});

app.get('/api/users/:userId/settings', async (req, res) => {
  try {
    const user = (await ensureSeedUsers()).find((item) => item.id === req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      isDark: Boolean(user.settings?.isDark),
      defaultMessage: user.settings?.defaultMessage ?? defaultSettings.defaultMessage,
      defaultMessageImage: user.settings?.defaultMessageImage ?? '',
      chatWallpaper: user.settings?.chatWallpaper ?? '',
    });
  } catch {
    return res.status(500).json({ error: 'Failed to load settings' });
  }
});

app.put('/api/users/:userId/settings', async (req, res) => {
  try {
    const result = await serializeUserMutation(async () => {
      const users = await ensureSeedUsers();
      const userIndex = users.findIndex((item) => item.id === req.params.userId);
      if (userIndex === -1) {
        return { status: 404, body: { error: 'User not found' } };
      }

      const currentSettings = users[userIndex].settings || defaultSettings;
      const nextSettings = {
        isDark: typeof req.body?.isDark === 'boolean'
          ? req.body.isDark
          : currentSettings.isDark ?? defaultSettings.isDark,
        defaultMessage: typeof req.body?.defaultMessage === 'string'
          ? req.body.defaultMessage
          : currentSettings.defaultMessage ?? defaultSettings.defaultMessage,
        defaultMessageImage: typeof req.body?.defaultMessageImage === 'string'
          ? req.body.defaultMessageImage
          : currentSettings.defaultMessageImage ?? defaultSettings.defaultMessageImage,
        chatWallpaper: typeof req.body?.chatWallpaper === 'string'
          ? req.body.chatWallpaper
          : currentSettings.chatWallpaper ?? defaultSettings.chatWallpaper,
      };

      users[userIndex].settings = nextSettings;
      await writeUsersFile(users);
      return { status: 200, body: nextSettings };
    });
    return res.status(result.status).json(result.body);
  } catch {
    return res.status(500).json({ error: 'Failed to save settings' });
  }
});

app.get('/api/users/:userId/chats', async (req, res) => {
  try {
    const user = (await ensureSeedUsers()).find((item) => item.id === req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(Array.isArray(user.chats) ? user.chats : []);
  } catch {
    return res.status(500).json({ error: 'Failed to load chats' });
  }
});

app.put('/api/users/:userId/chats', async (req, res) => {
  try {
    const result = await serializeUserMutation(async () => {
      const users = await ensureSeedUsers();
      const userIndex = users.findIndex((item) => item.id === req.params.userId);
      if (userIndex === -1) {
        return null;
      }

      const chats = Array.isArray(req.body) ? req.body : [];
      users[userIndex].chats = chats;
      await writeUsersFile(users);
      return chats;
    });
    if (result === null) {
      return res.status(404).json({ error: 'User not found' });
    }

    broadcastChats(req.params.userId, result);
    return res.json(result);
  } catch {
    return res.status(500).json({ error: 'Failed to save chats' });
  }
});

httpServer.listen(port, () => {
  console.log(`Contacts API running on http://localhost:${port}`);
});
