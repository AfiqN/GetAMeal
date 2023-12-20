const express = require('express');
const router = express.Router({mergeParams: true});
const user = require('../controllers/user');

router.route('/')
    .get(user.renderSignInView);

router.route('/sign-up')
    .get(user.renderSignUpView);

router.route('/sign-in')
    .get(user.renderSignInView);

router.route('/forgot-pass')
    .get(user.renderForgotPassword);

module.exports = router;