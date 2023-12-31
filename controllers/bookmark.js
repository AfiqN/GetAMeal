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

    res.render('dashboard/bookmark', { bookmark });
}

