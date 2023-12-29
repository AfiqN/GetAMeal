const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MakananSchema = new Schema({
    id: Number,
    namal: String,
    deskripsi: String,
    path_gambar: String,
    click_count: Number,
    resep: [String],
    prosedur: [String],
    kategori: [Object],
})

module.exports = mongoose.model('Makanan', MakananSchema);