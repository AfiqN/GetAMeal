const express = require('express');
const router = express.Router({mergeParams: true});
const bookmark = require('../controllers/bookmark');
const makanan = require('../controllers/makanan');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(bookmark.renderBookmark);

router.route('/tambah')
    .post(isLoggedIn, bookmark.addBookmark);

router.route('/hapus')
    .post(isLoggedIn, bookmark.removeBookmark);

router.route('/:id/hapus-makanan')
    .post(isLoggedIn, bookmark.removeFromBookmark);

router.route('/:id/tambah-makanan')
    .post(isLoggedIn, bookmark.addFromBookmark);

router.route('/:id')
    .get(bookmark.renderDetailBookmark);

module.exports = router;