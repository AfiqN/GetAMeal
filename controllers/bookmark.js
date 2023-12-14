const User = require('../models/user.js');
const bookmark = require('../dummyRbookmark.js');

module.exports.renderAllBookmark = (req, res) => {
    res.render('bookmark/all', {rekomendasi});
}
 
module.exports.renderEditBookmark = (req, res) => {
    res.render('bookmark/edit', {bookmark});
}

module.exports.renderAddBookmarkForm = (req, res) => {
    res.render('bookmark/add', {bookmark});
}

module.exports.renderDescBookmark = (req, res) => {
    data = "";
    for (let b of bookmark) {
        if (bookmark.id == req.params.id) {
            data = b;
        }
    }
    res.render('bookmark/desc', {data})
}