const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory storage for journal entries
let journalEntries = [];

// Example route: Get daily Bible verse (static for now)
app.get('/api/verse', (req, res) => {
  res.json({
    verse: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son..."
  });
});

// Route: Get all journal entries
app.get('/api/journal', (req, res) => {
  res.json(journalEntries);
});

// Route: Post new journal entry
app.post('/api/journal', (req, res) => {
  const { date, text } = req.body;

  if (!date || !text) {
    return res.status(400).json({ error: 'Date and text are required.' });
  }

  const newEntry = { date, text };
  journalEntries.push(newEntry);
  res.status(201).json({ message: 'Entry saved', entry: newEntry });
});

// To prevent 403 on root access
app.get('/', (req, res) => {
  res.send('Welcome to the Daily Bible Verse API.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
