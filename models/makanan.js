const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MakananSchema = new Schema({
    nama_makanan: String,
    deskripsi: String,
    path_gambar: String,
    click_count: Number,
    resep: [String],
    prosedur: [String],
    kategori: [Object],
})

module.exports = mongoose.model('Makanan', MakananSchema);