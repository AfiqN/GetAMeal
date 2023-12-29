const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    judul: String,
    makanan: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Makanan',
        }
    ]
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);