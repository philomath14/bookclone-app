const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Book = require('./models/book');
const Review = require('./models/review');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/bookthing');
 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


const sessionConfig = {
    secret: 'tempsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//Testing Authentication - Route will be removed later
app.get('/newFakeUser',async(req,res)=>{
    const user = new User({email: 'dummy@gmail.com', username: 'dummy'});
    const regNewUser = await User.register(user,'dummy1234');
    res.send(regNewUser);
})

//Home route
app.get('/',async(req,res)=>{
    const books = await Book.find({}).limit(4);
    res.render('home', {books});
})

//We will keep this route if we use 'Browse' button instead of Search Bar
app.get('/books', catchAsync(async(req,res)=> {
    const books = await Book.find({}).limit(10);
    res.render('books/index',{books});
}));

//Book Description Route
app.get('/books/:id', catchAsync(async(req,res)=>{
    const book = await Book.findById(req.params.id);
    res.render('books/show',{book});
}));

//Route for Posting Review

app.post('/books/:id/reviews',catchAsync(async(req,res)=>{
    const book = await Book.findById(req.params.id);
    const review = new Review(req.body.review);
    book.reviews.push(review);
    await review.save();
    await book.save();
    res.redirect(`/books/${book._id}`);
    
}))



app.all('*', (req, res, next)=> {
    next(new ExpressError('Page Not Found', 404))
})

//Basic Error Handler 
app.use((err, req, res, next)=>{
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Sorry but Something went Wrong!!';
    res.status(statusCode).render('error', {err})
})

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})