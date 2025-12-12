const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const booksPath = path.join(__dirname, '../data/books.json');

// Helper to read books
const getBooks = () => {
  const data = fs.readFileSync(booksPath, 'utf8');
  return JSON.parse(data);
};

// Helper to save books
const saveBooks = (books) => {
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2), 'utf8');
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'TT Book' });
});

/* API: Get all books */
router.get('/api/books', (req, res) => {
  try {
    const books = getBooks();
    res.json(books);
  } catch (error) {
    console.error("Failed to retrieve books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

/* View: Book Details */
router.get('/books/:id', (req, res) => {
  const books = getBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.render('book', { book });
  } else {
    res.status(404).send('Book not found');
  }
});

/* View: Edit Book */
router.get('/books/:id/edit', (req, res) => {
  const books = getBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.render('edit', { book });
  } else {
    res.status(404).send('Book not found');
  }
});

/* API: Update Book */
router.post('/books/:id', (req, res) => {
  const books = getBooks();
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

  if (bookIndex > -1) {
    // Update fields
    const updatedBook = {
      ...books[bookIndex],
      title: req.body.title,
      author: req.body.author,
      category: req.body.category, // Keep as category for display
      genre: req.body.genre,       // Keep genre for filtering
      review: req.body.review,
      rating: parseFloat(req.body.rating)
    };

    books[bookIndex] = updatedBook;
    saveBooks(books);

    res.redirect(`/books/${req.params.id}`);
  } else {
    res.status(404).send('Book not found');
  }
});

module.exports = router;
