const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    creatorId: { type: String, required: false },
    genre: String,
    category: String,
    publishedYear: Number,
    rating: Number,
    image: String,
    review: String,
    reviewer: String,
    reviewDate: String
});

module.exports = mongoose.model("Book", BookSchema);
