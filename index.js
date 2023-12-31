const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const routeUser = require('./routes/user.js');
const routeBookmark = require('./routes/bookmark.js');
const routeMakanan = require('./routes/makanan.js');
const flash = require('connect-flash');

const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const User = require('./models/user.js')
const Makanan = require('./models/makanan.js')
const Bookmark = require('./models/bookmark.js')


const dbUrl = process.env.DB_URL || `mongodb://127.0.0.1:27017/getameal`;
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "database connection error"))
db.once("open", ()=>{
    console.log("Database connected");
})

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

const secret = process.env.SECRET || 'shouldbeasecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret,
    }
})

store.on('error', function (err) {
    console.error("session store error", err);
})

const sessionConfig = {
    store,
    name: 'randomcookie',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', routeUser);
app.use('/makanan', routeMakanan);
app.use('/bookmark', routeBookmark);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('listening on http://localhost:3000');
})