const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Book = require('./models/book');

mongoose.connect('mongodb://localhost:27017/bookthing');
 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Home route
app.get('/',async(req,res)=>{
    const books = await Book.find({});
    res.render('home', {books});
})

//We will keep this route if we use 'Browse' button instead of Search Bar
app.get('/books', async(req,res)=> {
    const books = await Book.find({});
    res.render('books/index',{books});
})

//Book Description Route
app.get('/books/:id', async(req,res)=>{
    const book = await Book.findById(req.params.id);
    res.render('books/show',{book});
})

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})