const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const user = require('../controllers/user');
const {storeReturnTo} = require('../middleware');

router.route('/sign-up')
    .get(user.renderSignUpView)
    .post(catchAsync(user.signUpUser));

router.route('/sign-in')
    .get(user.renderSignInView)
    .get(storeReturnTo, passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/sign-in'
    }), user.signInUser);

router.route('/sign-out', user.signOutUser);

module.exports = router;