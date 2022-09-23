const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

//New User Registration Routes
//create a new account: serve the registration form 
router.get('/register', (req,res) => {
    res.render('userAuth/register');
})

//create a new account: submit the registration form
router.post('/register', catchAsync(async(req,res,next)=>{
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err=>{
            if(err) return next(err);
            req.flash('success',`Hey ${username}, Welcome to BookThing!`);
            res.redirect('/books');
        })
    } catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
        
}))

//User Login routes

router.get('/login', (req,res)=>{
    res.render('userAuth/login');
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}),(req,res)=>{
    const {username} = req.body;
    req.flash('success', `Welcome back, ${username}!`);
    res.redirect('/books');
})

router.get('/logout', (req,res, next)=>{
    req.logout(function(err){
        if(err) {
            return next(err);
        }
        req.flash('success',"Sayonara!");
        res.redirect('/')
    });
})

module.exports = router;