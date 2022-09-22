const express = require('express');
const router = express.Router({mergeParams : true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Book = require('../models/book');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas.js');

//Server-side validation 
const validateReview = (req,res,next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//Route for Posting Review

router.post('/', validateReview, catchAsync(async(req,res)=>{
    const book = await Book.findById(req.params.id);
      const review = new Review(req.body.review);
      book.reviews.push(review);
      await review.save();
      await book.save();
      req.flash('success', 'Submitted your review!');
      res.redirect(`/books/${book._id}`);
  }))
  
  //Deleting Review Route
  router.delete('/:reviewId',catchAsync(async(req,res)=>{
      const {id, reviewId} = req.params;
      await Book.findByIdAndUpdate(id,{pull: {reviews: reviewId}});
      await Review.findByIdAndDelete(reviewId);
      req.flash('success', 'Your review has been deleted!');
      res.redirect(`/books/${id}`);
  }))

  module.exports = router;