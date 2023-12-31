const Makanan = require('../models/makanan');
const User = require('../models/user');

module.exports.renderDashboard = async (req, res) => {
    allMakanan = await Makanan.find().sort({ click_count: -1 });   
    res.render('dashboard/dashboard', { dataMakanan: allMakanan });
}   
module.exports.renderDeskripsi = async (req, res) => {
    data = await Makanan.find({ nama_makanan: req.params.id });
    data = data[0];
    data.click_count += 1;
    await data.save();
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