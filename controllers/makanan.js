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
    data = await Makanan.find({ nama_makanan: req.params.id });
    data = data[0];

    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }
    
    res.render('dashboard/resep', { data, user: req.user, bookmark: allUserBookmark });
}                  
module.exports.renderProsedur = async (req, res) => {
    data = await Makanan.find({ nama_makanan: req.params.id });
    data = data[0];

    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }

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
    const { cari, kategori } = req.query;
    const arrKategori = [];
    let cariMakanan = [];

    

    if (cari !== "") {
        cariMakanan = await Makanan.find({ nama_makanan : { $regex: `${cari}`, $options: 'i' }});
    } 
    
    if (typeof kategori !== "undefined") {
        if (typeof kategori === "string") {
            arrKategori.push(kategori);
        } else {
            arrKategori.push(...kategori);
        }
        const allMakanan = await Makanan.find({});
        // console.log(arrKategori);
        for (makanan of allMakanan) {
            let isFound = arrKategori.every(value => makanan.kategori.includes(value));
            // console.log(isFound);
            if (isFound) {
                cariMakanan.push(makanan);
            }
        }
    }
    
    // console.log(cariMakanan);
    const allUserBookmark = [];
    for (const item of req.user.bookmark) {
        allUserBookmark.push(await Bookmark.findById(item));
    }
    res.render('dashboard/show-makanan', { dataMakanan: cariMakanan, user: req.user, bookmark: allUserBookmark });
}
module.exports.tambahKeBookmark = async (req, res) => {
    const { id_bookmark } = req.body;
    const makananIdCheck = await Makanan.findOne({ nama_makanan: req.params.id });

    if (typeof id_bookmark === "object"){ 
        try {
            for (const bId of id_bookmark) {
                const selectBm = await Bookmark.findById(bId);
                if (!selectBm.makanan.includes(makananIdCheck._id)) {
                    const selectM = await Makanan.findOne({ nama_makanan: req.params.id });
                    selectBm.makanan.push(selectM._id);
                    await selectBm.save();
                }
            }
        } catch (err) {
            console.log(err);
            req.flash('error', 'Makanan telah ada pada bookmark');
        }
    } else if (typeof id_bookmark === "string") {
        const bookmarkWithMakanan = await Bookmark.findOne({
            makanan: { $in: [makananIdCheck._id] }
        });
        if (bookmarkWithMakanan) {
            req.flash('error', 'Makanan telah ada pada bookmark');
        } else {
            try {
                const selectBm = await Bookmark.findById(id_bookmark);
                const selectM = await Makanan.findOne({nama_makanan: req.params.id});
                selectBm.makanan.push(selectM._id);
                await selectBm.save();
            } catch (err) {
                console.log(err);
                req.flash('error', 'Makanan telah ada pada bookmark');
            }
        }
    } else {
        req.flash('error', 'Anda tidak memilih apapun');
    }
    res.redirect('/makanan/'+req.params.id);
}