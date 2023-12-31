const Makanan = require('../models/makanan');
const User = require('../models/user');

module.exports.renderDashboard = (req, res) => {
    res.render('dashboard/dashboard');
}   
module.exports.renderDeskripsi = async (req, res) => {
    data = await Makanan.find({ id: req.params.id });
    data = data[0];
    res.render('dashboard/deskripsi', { data });
}   
module.exports.renderResep = async (req, res) => {
    data = await Makanan.find({ id: req.params.id });
    data = data[0];
    res.render('dashboard/deskripsi', { data });
    res.render('dashboard/resep', { data });
}   
module.exports.renderProsedur = async (req, res) => {
    data = await Makanan.find({ id: req.params.id });
    data = data[0];
    res.render('dashboard/deskripsi', { data });
    res.render('dashboard/prosedur', { data })
}   
module.exports.renderListMakanan = async (req, res) => {
    allMakanan = await Makanan.find({});
    res.render('dashboard/show-makanan', { dataMakanan: allMakanan });
}   
module.exports.renderCariMakanan = (req, res) => {
    res.render('dashboard/cari')
}