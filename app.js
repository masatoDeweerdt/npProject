const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 5000

require('dotenv').config()

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

app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const newsRouter = require('./src/routes/news')

app.use('/', newsRouter) // Front page
app.use('/article', newsRouter) // Single article

// Listen on port 5000
app.listen(port, () => console.log(`Listening to port ${port}`))