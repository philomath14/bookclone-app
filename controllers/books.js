const Book = require('../models/book');

module.exports.index = async(req,res)=> {
    const books = await Book.find({});
    res.render('books/index',{books});
}

module.exports.showBookDescription = async(req,res)=>{
    const book = await Book.findById(req.params.id).populate({path:'reviews', populate:{path:'author'}});
    const book_genres = (book.genre[0].replace(/,/g, ' | ').replace(/[\[\]']+/g,'')); 
    res.render('books/show',{book, book_genres});
}

