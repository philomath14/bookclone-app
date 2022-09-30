const User = require('../models/user');

module.exports.renderRegister = (req,res) => {
    res.render('userAuth/register');
}

module.exports.register = async(req,res,next)=>{
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
        
}

module.exports.renderLogin = (req,res)=>{
    res.render('userAuth/login');
}

module.exports.login = (req,res)=>{
    const {username} = req.body;
    req.flash('success', `Welcome back, ${username}!`);
    res.redirect('/books');
}

module.exports.logout = (req,res, next)=>{
    req.logout(function(err){
        if(err) {
            return next(err);
        }
        req.flash('success',"Sayonara!");
        res.redirect('/')
    });
}