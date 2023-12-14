const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const makanan = require('../controllers/makanan');
const allMakanan = require('../dummy.js');

router.route('/favorite')
    .get(makanan.renderMakananFavorit);

router.route('/rekomendasi')
    .get(makanan.renderRekomendasiMakanan);

router.route('/search')
    .get(makanan.renderCariMakanan);

router.route('/:kode')
    .get(makanan.renderDeskripsiMakanan);

module.exports = router;
