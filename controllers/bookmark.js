const User = require('../models/user');
const Bookmark = require('../models/bookmark');
const Makanan = require('../models/makanan');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

module.exports.renderBookmark = async (req, res) => {
    const user = await User.findById(req.user._id).populate({
        path : 'bookmark',
        populate: {
            path: 'makanan',
            model: 'Makanan',
        }
    });
    const bookmark = user.bookmark;

    res.render('dashboard/bookmark', { bookmark , user: req.user });
}

module.exports.addBookmark = async (req, res) => {
    const { judul } = req.body;
    
    const check = await Bookmark.findOne({ judul_bookmark : judul });
    
    if (check == null) {
        const newBookmark = new Bookmark({ judul_bookmark : judul });
        await newBookmark.save();
    
        const user = await User.findById(req.user._id);
        user.bookmark.push(newBookmark);
        await user.save();
    
        req.flash('success', 'Bookmark berhasil ditambahkan!');
        res.redirect('/makanan/rekomendasi');
    } else {
        req.flash('error', 'Bookmark dengan nama '+ judul +' telah ada!');
        res.redirect('/makanan/rekomendasi');
    }
}

module.exports.renderDetailBookmark = async (req, res) => {
    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }
    
    const bookmark = await Bookmark.findOne({ judul_bookmark : req.params.id });
    const allMakanan = [];
    for (let makanan of bookmark.makanan) {
        allMakanan.push(await Makanan.findById(makanan));
    }

    res.render('dashboard/show-makanan', { dataMakanan: allMakanan, user: req.user, bookmark: allUserBookmark });
}