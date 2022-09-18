const mongoose = require('mongoose');
const books = require('./books-sample');
const Book = require('../models/book');


mongoose.connect('mongodb://localhost:27017/bookthing');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async() => {
    await Book.deleteMany({});
    
    for(let i = 1; i < 5; i++){
        
        const random = Math.floor(Math.random()*50);
        const book = new Book({
            title: `${books.bbe[random].title}`,
            author: `${books.bbe[random].author}`,
            rating: `${books.bbe[random].rating}`,
            genre: `${books.bbe[random].genres}`,
            image: `${books.bbe[random].coverImg}`
            //description: `${books.paperbacks[random].description}`

        })
        await book.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
 

