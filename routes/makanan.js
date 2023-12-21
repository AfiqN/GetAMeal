const express = require('express');
const router = express.Router({mergeParams: true});
const makanan = require('../controllers/makanan');

router.route('/')
    .get(makanan.renderDashboard);
router.route('/deskripsi')
    .get(makanan.renderDeskripsi);
router.route('/deskripsi/resep')
    .get(makanan.renderResep);
router.route('/deskripsi/prosedur')
    .get(makanan.renderProsedur);


module.exports = router;
