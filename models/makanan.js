const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MakananSchema = new Schema({
    kode: String,
    nama: String,
    kategori: [String],
    deskripsi: String,
    resep: String,
    prosedur: String,
    pathGambar: String,
});

module.exports = mongoose.model('Makanan', MakananSchema);