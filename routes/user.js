const express = require('express');
const router = express.Router({mergeParams: true});
const user = require('../controllers/user');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(user.renderSignInView);

router.route('/sign-up')
    .get(user.renderSignUpView)
    .post(catchAsync(user.signUpUser));

router.route('/sign-in')
    .get(user.renderSignInView);

module.exports = router;