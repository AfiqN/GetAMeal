const User = require('../models/user');

module.exports.renderSignUpView = (req, res) => {
    res.render('user/sign-up');
}

module.exports.signUpUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Berhasil Sign-up');
            res.redirect('/sign-in');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/sign-up');
    }
}

module.exports.renderSignInView = (req, res) => {
    res.render('user/login');
}

module.exports.signInUser = (req, res) => {
    req.flash('success', 'Berhasil Sign-in');
    const redirectUrl = res.locals.returnTo || '/';
    res.redirec(redirectUrl);
}

module.exports.signOutUser = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Berhasil Sign-out');
        req.redirect('/login');
    });
}