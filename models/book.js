const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    description: String,
    year: Number,
    genre: Array,
    rating: String,
    image: String
});

module.exports = mongoose.model('Book', BookSchema);


