const Makanan = require('../models/makanan');
const Bookmark = require('../models/bookmark')
const User = require('../models/user');

module.exports.renderDashboard = async (req, res) => {
    allMakanan = await Makanan.find().sort({ click_count: -1 });
    
    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }

    res.render('dashboard/dashboard', { dataMakanan: allMakanan, user: req.user, bookmark: allUserBookmark });
}   
module.exports.renderDeskripsi = async (req, res) => {
    data = await Makanan.find({ nama_makanan: req.params.id });
    data = data[0];
    data.click_count += 1;
    await data.save();

    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }

    res.render('dashboard/deskripsi', { data, user: req.user, bookmark: allUserBookmark });
}                   
module.exports.renderResep = async (req, res) => {
    data = await Makanan.find({ id: req.params.id });
    data = data[0];

    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }

    res.render('dashboard/deskripsi', { data });
    res.render('dashboard/resep', { data, user: req.user, bookmark: allUserBookmark });
}                  
module.exports.renderProsedur = async (req, res) => {
    data = await Makanan.find({ id: req.params.id });
    data = data[0];

    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }

    res.render('dashboard/deskripsi', { data });
    res.render('dashboard/prosedur', { data, user: req.user, bookmark: allUserBookmark })
}                  
module.exports.renderListMakanan = async (req, res) => {
    allMakanan = await Makanan.find({});

    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }

    res.render('dashboard/show-makanan', { dataMakanan: allMakanan, user: req.user, bookmark: allUserBookmark });
}   
module.exports.renderCariMakanan = async (req, res) => { 

    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }

    res.render('dashboard/cari' , { user: req.user, bookmark: allUserBookmark });
}