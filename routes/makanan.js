const express = require('express');
const router = express.Router({mergeParams: true});
const makanan = require('../controllers/makanan');

router.route('/rekomendasi')
    .get(makanan.renderDashboard);

router.route('/:id') // :id
    .get(makanan.renderDeskripsi);

router.route('/:id/resep')
    .get(makanan.renderResep);

router.route('/:id/prosedur')
    .get(makanan.renderProsedur);
    
router.route('/list-makanan')
    .get(makanan.renderListMakanan);


module.exports = router;
