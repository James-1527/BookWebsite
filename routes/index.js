const express = require('express');
const router = express.Router();
const Book = require('../models/listbook');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

/* GET home page. */
/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const featuredBook = await Book.findOne().sort({ rating: -1 });
    res.render('index', { title: 'TT Book', featuredBook });
  } catch (err) {
    console.error("Error fetching featured book:", err);
    res.render('index', { title: 'TT Book', featuredBook: null });
  }
});

/* API: Get all books */
router.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    // Map _id to id for frontend compatibility if needed, but better to update frontend
    const booksWithId = books.map(b => {
      const bookObj = b.toObject();
      bookObj.id = bookObj._id; // Ensure id property exists for frontend compatibility
      return bookObj;
    });
    res.json(booksWithId);
  } catch (error) {
    console.error("Failed to retrieve books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

/* View: Book Details */
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.render('book', {
        book,
        currentUserId: req.cookies.userId
      });
    } else {
      res.status(404).send('Book not found');
    }
  } catch (err) {
    res.status(404).send('Book not found or invalid ID');
  }
});

/* View: Edit Book */
/* View: Edit Book */
router.get('/books/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    // Authorization Check
    if (book.creatorId && book.creatorId !== req.cookies.userId) {
      return res.status(403).send('Unauthorized to edit this book');
    }

    res.render('edit', { book });
  } catch (err) {
    res.status(404).send('Book not found');
  }
});

/* View: Add Book */
/* View: Add Book */
router.get('/create-book', (req, res) => {
  if (!req.cookies.userId) {
    return res.redirect('/login#login'); // Redirect to login if not authenticated
  }
  res.render('create');
});

/* API: Create Book */
/* API: Create Book */
router.post('/create-book', upload.single('image'), async (req, res) => {
  try {
    if (!req.cookies.userId) {
      return res.status(401).send("Unauthorized: Please log in");
    }

    let imagePath = '';
    if (req.file) {
      imagePath = '/images/' + req.file.filename;
    } else if (req.body.imageUrl) {
      imagePath = req.body.imageUrl;
    }

    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      creatorId: req.cookies.userId,
      genre: req.body.genre,
      category: req.body.category,
      publishedYear: req.body.publishedYear,
      rating: req.body.rating,
      image: imagePath,
      review: req.body.review,
      reviewer: req.body.reviewer,
      reviewDate: req.body.reviewDate || new Date().toLocaleDateString()
    });
    await newBook.save();
    res.redirect('/'); // Or return JSON if strictly API
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).send("Error creating book");
  }
});

/* API: Update Book */
/* API: Update Book */
router.post('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");

    // Authorization Check
    if (book.creatorId && book.creatorId !== req.cookies.userId) {
      return res.status(403).send("Unauthorized to update this book");
    }

    const updateData = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      genre: req.body.genre,
      review: req.body.review,
      rating: parseFloat(req.body.rating),
      image: req.body.image
    };

    await Book.findByIdAndUpdate(req.params.id, updateData);
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book");
  }
});

/* API: Delete Book */
/* API: Delete Book */
router.post('/delete-book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");

    // Authorization Check
    if (book.creatorId && book.creatorId !== req.cookies.userId) {
      return res.status(403).send("Unauthorized to delete this book");
    }

    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Error deleting book");
  }
});

module.exports = router;
