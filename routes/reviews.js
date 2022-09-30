const express = require('express');
const router = express.Router({mergeParams : true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Book = require('../models/book');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const { reviewSchema } = require('../schemas.js');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware');




//Route for Posting Review

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));
  
  //Deleting Review Route
  router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview));

  module.exports = router;