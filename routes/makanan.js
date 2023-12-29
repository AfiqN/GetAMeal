const express = require('express');
const router = express.Router({mergeParams: true});
const makanan = require('../controllers/makanan');

router.route('/rekomendasi')
    .get(makanan.renderDashboard);

router.route('/cari')
    .get(makanan.renderCariMakanan);

router.route('/list-makanan')
    .get(makanan.renderListMakanan);
    
router.route('/:id/resep')
    .get(makanan.renderResep);

router.route('/:id/prosedur')
    .get(makanan.renderProsedur);

router.route('/:id') // :id
    .get(makanan.renderDeskripsi);

module.exports = router;
