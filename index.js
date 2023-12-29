const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const routeUser = require('./routes/user.js');
const routeBookmark = require('./routes/bookmark.js');
const routeMakanan = require('./routes/makanan.js');

const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const User = require('./models/user.js')
const Makanan = require('./models/makanan.js')

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

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routeUser);
app.use('/makanan', routeMakanan);
app.use('/bookmark', routeBookmark);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('listening on http://localhost:3000');
})