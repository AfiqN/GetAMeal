const express = require('express');
const router = express.Router({mergeParams: true});
const user = require('../controllers/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware.js');

router.route('/')
    .get(user.renderSignInView);

router.route('/sign-up')
    .get(user.renderSignUpView)
    .post(catchAsync(user.signUpUser));

router.route('/sign-in')
    .get(user.renderSignInView)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/sign-in'}), user.signInUser);

module.exports = router;