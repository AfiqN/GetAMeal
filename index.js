const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const routeUser = require('./routes/user.js');
const routeBookmark = require('./routes/bookmark.js');
const routeMakanan = require('./routes/makanan.js');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routeUser);
app.use('/dashboard', routeMakanan);
app.use('/bookmark', routeBookmark);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('listening on http://localhost:3000');
})