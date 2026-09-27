import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3002;
const usersPath = path.join(__dirname, 'public', 'users.json');
const contactsPath = path.join(__dirname, 'public', 'contacts.json');

const defaultSettings = {
  isDark: true,
  defaultMessage: `📍 *SELAMAT! Nomor kamu terpilih sebagai ID VIP dengan winrate 97% di CUAN88* 🔥

🌹 *Link Daftar Hoki* ➡️  cutt.ly/DftrlgsgMaxW1n

_Dijamin WD Minimal 1 Juta di deposit pertama_ *Tidak WD? GARANSI SALDO KEMBALI!*

‼️ Ada kendala dalam pembuatan ID? *Chat ke wa pribadi aku* Klik ➡️  cutt.ly/WaJeniCn88

*_TERBUKTI SITUS RESMI NO 1 SE-ASIA_*‼️
⚠️ Cari kami di google ketik: *CUAN88*  ⚠️`,
  defaultMessageImage: '',
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

    await writeUsersFile(persistedUsers);
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
  ];

  await writeUsersFile(seeded);
  return seeded;
}

app.use(express.json({ limit: '10mb' }));

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
      },
    }));

    await writeUsersFile(users);
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

    const users = await ensureSeedUsers();
    const exists = users.some((user) => user.username.toLowerCase() === cleanUsername.toLowerCase());
    if (exists) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username: cleanUsername,
      displayName: cleanDisplayName,
      passwordHash: hashPassword(String(password)),
      chats: [],
      settings: { ...defaultSettings },
    };

    const nextUsers = [...users, newUser];
    await writeUsersFile(nextUsers);
    return res.status(201).json({ user: sanitizeUser(newUser) });
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
      defaultMessage: user.settings?.defaultMessage || defaultSettings.defaultMessage,
      defaultMessageImage: user.settings?.defaultMessageImage || '',
    });
  } catch {
    return res.status(500).json({ error: 'Failed to load settings' });
  }
});

app.put('/api/users/:userId/settings', async (req, res) => {
  try {
    const users = await ensureSeedUsers();
    const userIndex = users.findIndex((item) => item.id === req.params.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const nextSettings = {
      isDark: Boolean(req.body?.isDark ?? true),
      defaultMessage: req.body?.defaultMessage || defaultSettings.defaultMessage,
      defaultMessageImage: req.body?.defaultMessageImage || '',
    };

    users[userIndex].settings = nextSettings;
    await writeUsersFile(users);
    return res.json(nextSettings);
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
    const users = await ensureSeedUsers();
    const userIndex = users.findIndex((item) => item.id === req.params.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const chats = Array.isArray(req.body) ? req.body : [];
    users[userIndex].chats = chats;
    await writeUsersFile(users);
    return res.json(chats);
  } catch {
    return res.status(500).json({ error: 'Failed to save chats' });
  }
});

app.listen(port, () => {
  console.log(`Contacts API running on http://localhost:${port}`);
});
