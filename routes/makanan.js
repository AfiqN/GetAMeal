const express = require('express');
const router = express.Router({mergeParams: true});
const makanan = require('../controllers/makanan');

router.route('/')
    .get(makanan.renderDashboard);
router.route('/deskripsi')
    .get(makanan.renderDeskripsi)
module.exports = router;