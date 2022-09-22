const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Book = require('../models/book');

//We will keep this route if we use 'Browse' button instead of Search Bar
router.get('/', catchAsync(async(req,res)=> {
    const books = await Book.find({}).limit(10);
    res.render('books/index',{books});
}));

//Book Description Route
router.get('/:id', catchAsync(async(req,res)=>{
    const book = await Book.findById(req.params.id).populate('reviews');
    res.render('books/show',{book});
}));

module.exports = router;