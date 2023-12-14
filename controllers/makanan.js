const User = require('../models/makanan');
const makanan = require('../dummy.js')
const { query } = require('express');

module.exports.renderDeskripsiMakanan = (req, res) => {
    data = "";
    for (let m of makanan) {
        if (m.kode == req.params.kode) {
            data = m;
        }
    }
    res.render('/makanan/deskripsi', {data});
}

module.exports.renderMakananFavorit = (req, res) => {
    res.render('makanan/favorite', {makanan});
}

module.exports.renderRekomendasiMakanan = (req, res) => {
    res.render('makanan/rekomendasi', {makanan});
}

module.exports.renderCariMakanan = (req, res) => {
    let query = req.query.search;

    if (!query) {
        query = 'Pencarian anda kosong';
        let result = "";
        return res.render('/makanan/cari', {query, result});
    }

    const result = makanan.filter(item => item.nama.toLowerCase().includes(query.toLowerCase()));

    res.render('makanan/cari', {query, result});
}