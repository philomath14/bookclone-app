const Book = require('../models/book');

module.exports.index = async(req,res)=> {
    const books = await Book.find({}).limit(10);
    res.render('books/index',{books});
}

module.exports.showBookDescription = async(req,res)=>{
    const book = await Book.findById(req.params.id).populate({path:'reviews', populate:{path:'author'}});
    //console.log(book);
    res.render('books/show',{book});
}

