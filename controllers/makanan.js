module.exports.renderDashboard = (req, res) => {
    res.render('dashboard/dashboard');
}
module.exports.renderDeskripsi = (req, res) => {
    res.render('dashboard/deskripsi')
}
module.exports.renderResep = (req, res) => {
    res.render('dashboard/resep')
}
module.exports.renderProsedur = (req, res) => {
    res.render('dashboard/prosedur')
}
module.exports.renderListMakanan = (req, res) => {
    res.render('dashboard/show-makanan')
}

module.exports.renderCariMakanan = (req, res) => {
    res.render('dashboard/cari')
}