const express = require('express');
const router = express.Router({mergeParams: true});
const bookmark = require('../controllers/bookmark');
const makanan = require('../controllers/makanan');

router.route('/')
    .get(bookmark.renderBookmark);

module.exports = router;