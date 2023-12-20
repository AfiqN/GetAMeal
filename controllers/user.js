module.exports.renderSignUpView = (req, res) => {
    res.render('user/sign-up');
}

module.exports.renderSignInView = (req, res) => {
    res.render('user/sign-in');
}

module.exports.renderForgotPassword = (req, res) => {
    res.render('user/forgot-pass');
}