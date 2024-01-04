const User = require('../models/user');
const Bookmark = require('../models/bookmark');
const Makanan = require('../models/makanan');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

module.exports.renderBookmark = async (req, res) => {
    const allUserBookmark = [];
    const imgBookmarkFood = [];

    for (let i=0; i<req.user.bookmark.length; i++) {
        bm = await Bookmark.findById(req.user.bookmark[i]);
        allUserBookmark.push(await Bookmark.findById(bm));
        let gambar = []
        for (const makanan of bm.makanan) {
            m = await Makanan.findById(makanan);
            gambar.push(m.path_gambar);
        }
        imgBookmarkFood.push(gambar);
    }

    res.render('dashboard/bookmark', { bookmark: allUserBookmark, pathGambar: imgBookmarkFood });
}

module.exports.addBookmark = async (req, res) => {
    const { judul } = req.body;
    let condition = true;
    
    for (let userBookmark of req.user.bookmark) {
        let check = await Bookmark.findOne({ _id : userBookmark });
        if (check.judul_bookmark === judul) {
            condition = false;
            break;  
        }
    }
    
    if (condition) {
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

module.exports.removeBookmark = async (req, res) => {
    const user = await User.findById(req.user._id);
    const { ids } = req.body;
    try {
        if (typeof ids === "object") {
            for (let id of ids) {
                let index = user.bookmark.indexOf(id);
                if (index !== -1) {
                    user.bookmark.splice(index, 1);
                }
                await Bookmark.findOneAndDelete({ _id: id });
            }
        } else if (typeof ids === "string") {
            let index = user.bookmark.indexOf(ids);
            if (index !== -1) {
                user.bookmark.splice(index, 1);
            }
        } 
    }catch (err) {
        console.log(err);
    }
    user.save();
    await Bookmark.findOneAndDelete({ _id: ids });
    res.redirect('/bookmark');

}

module.exports.renderDetailBookmark = async (req, res) => {
    
    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }
    
    const bookmark = await Bookmark.findOne({ _id : req.params.id });
    const allMakanan = [];
    for (let makanan of bookmark.makanan) {
        allMakanan.push(await Makanan.findById(makanan));
    }

    res.render('dashboard/bookmark-detail', { dataMakanan: allMakanan, user: req.user, bookmark: allUserBookmark });
}