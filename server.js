const path = require('path');
const express = require('express');
const books = require('./data/books.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static assets (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/books', (_req, res) => {
  res.json(books);
});


// Fallback to index for any other GET (basic SPA-style support)
app.get('*', (req, res, next) => {
  if (req.method !== 'GET') return next();
  res.sendFile(path.join(__dirname, 'index.html'));
});


// 404 for non-GET routes that fall through
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
});

