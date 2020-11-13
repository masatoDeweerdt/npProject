const express = require('express')
const router = express.Router()
const axios = require('axios')
const { ensureAuthenticated } = require('../config/auth')

router.get('/', (req, res) => res.render('welcome'))

router.get('/logout', (req, res) => res.render('news'))

router.get('/news', async (req, res) => {
    try {
        const newsAPI = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts`)
        res.render('news', { articles: newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('news', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.error('Error', err.message)
        }
    }
})

// Single news page

router.get('/:id', async (req, res) => {
    let articleID = req.params.id //show article ID
    try {
        const newsAPI = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts/${articleID}`)
        res.render('newsSingle', { article: newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSingle', { article: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            res.render('newsSingle', { article: null })
            console.log(err.request)
        } else {
            res.render('newsSingle', { article: null })
            console.error('Error', err.message)
        }
    }
})

// Search

router.post('', async (req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`https://techcrunch.com/wp-json/wp/v2/posts?search=${search}`)
        res.render('newsSearch', { articles: newsAPI.data })
    } catch (err) {
        if (err.response) {
            res.render('newsSearch', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            res.render('newsSearch', { articles: null })
            console.log(err.request)
        } else {
            res.render('newsSearch', { articles: null })
            console.error('Error', err.message)
        }
    }
})

module.exports = router