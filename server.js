import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3002;
const contactsPath = path.join(__dirname, 'public', 'contacts.json');

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

app.listen(port, () => {
  console.log(`Contacts API running on http://localhost:${port}`);
});
