const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    judul_bookmark: {
        type: String,
        required: true,
    },
    makanan: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Makanan',
        }
    ]
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);