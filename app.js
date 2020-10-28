const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()
const port = 5000

require('dotenv').config()

// Passport config
require('./src/config/passport')(passport);

// DB Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.once('open', () => console.log('Connected to Database'))
db.on('error', (error) => console.error(error))

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/css'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Bodyparser

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
const newsRouter = require('./src/routes/news')

app.use('/news', newsRouter) // News page
app.use('/article', newsRouter) // Single article
app.use('/users', require('./src/routes/users'))

// Listen on port 5000
app.listen(port, () => console.log(`Listening to port ${port}`))