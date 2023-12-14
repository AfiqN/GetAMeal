const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const bookmark = require('../controllers/bookmark');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, bookmark.renderAllBookmark);

router.route('/edit')
    .get(bookmark.renderEditBookmark);

router.route('/add')
    .get(bookmark.renderAddBookmarkForm);

router.route('/:id')
    .get(bookmark.renderDescBookmark);

module.exports = router;
