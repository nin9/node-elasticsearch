const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

const articlesRoutes = require('./api/routes/articles')

app.use('/articles', articlesRoutes)

app.use((req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app