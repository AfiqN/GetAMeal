const User = require('../models/user');

module.exports.renderSignUpView = (req, res) => {
    res.render('user/sign-up');
}

module.exports.renderSignInView = (req, res) => {
    res.render('user/sign-in');
}