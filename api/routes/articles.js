const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')

router.get('/', ArticleController.index)

router.post('/', ArticleController.create)

module.exports = router