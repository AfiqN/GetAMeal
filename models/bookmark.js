const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema ({
    nama: String,
    makanan: [
        {
            tyoe: Schema.Types.ObjectId,
            ref: 'Makanan',
        }
    ]
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);