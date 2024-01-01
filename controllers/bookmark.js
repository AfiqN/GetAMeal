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
    const newBookmark = new Bookmark({ judul_bookmark : judul });
    await newBookmark.save();

    const user = await User.findById(req.user._id);
    user.bookmark.push(newBookmark);
    await user.save();

    req.flash('success', 'Bookmark berhasil ditambahkan!');
    res.redirect('/makanan/rekomendasi');
}