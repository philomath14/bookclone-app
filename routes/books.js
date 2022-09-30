const express = require('express');
const router = express.Router();
const books = require('../controllers/books');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Book = require('../models/book');

//We will keep this route if we use 'Browse' button instead of Search Bar
router.get('/', catchAsync(books.index));

//Book Description Route
router.get('/:id', catchAsync(books.showBookDescription));

module.exports = router;