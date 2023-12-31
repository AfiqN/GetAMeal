const User = require('../models/user');

module.exports.renderSignUpView = (req, res) => {
    res.render('user/sign-up');
}

module.exports.signUpUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({username, password});
        await User.insertMany( user );
        res.redirect('/sign-in')
    } catch (err) {
    
        req.flash('error', err.message);
        res.redirect('/sign-up');
    }
}

module.exports.renderSignInView = (req, res) => {
    res.render('user/sign-in');
}