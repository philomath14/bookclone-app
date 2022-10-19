const User = require('../models/user');

module.exports.renderRegister = (req,res) => {
    res.render('userAuth/register');
}

module.exports.register = async(req,res,next)=>{
    try{
        const {email, username, password, firstname, lastname, avatar} = req.body;
        const user = new User({email, username, firstname, lastname,avatar});
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        req.login(registeredUser, err=>{
            if(err) return next(err);
            req.flash('success',`Hey ${firstname}, Welcome to BookThing!`);
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
    const{firstname, _id} = req.user;
    req.flash('success', `Welcome back, ${firstname}!`);
    res.redirect(`/users/${_id}`);
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

// not working
module.exports.showUserProfile = async(req,res)=>{
    const foundUser = await User.findById(req.params.id);
    res.render('userAuth/userprofile',{foundUser});
}
