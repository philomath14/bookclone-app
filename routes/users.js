const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

//New User Registration Routes
//create a new account: serve the registration form 
//create a new account: submit the registration form


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));


//User Login routes

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}),users.login);

router.get('/logout', users.logout);

module.exports = router;