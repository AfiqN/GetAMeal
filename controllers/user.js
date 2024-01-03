const User = require('../models/user');

module.exports.renderSignUpView = (req, res) => {
    res.render('user/sign-up');
}

module.exports.signUpUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({username});
        const registered = await User.register(user, password);
        req.flash('success', 'Berhasil Sign-Up');
        res.redirect('/sign-in');
       
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/sign-up');
    }
}

module.exports.renderSignInView = (req, res) => {
    res.render('user/sign-in');
}

module.exports.signInUser = (req, res) => {
    req.flash('success', 'Berhasil Login');
    const redirectUrl = res.locals.returnTo || '/makanan/rekomendasi';
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/sign-in');
    });
}