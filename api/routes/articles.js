const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')

router.get('/', ArticleController.index)
router.get('/search', ArticleController.search)
router.post('/', ArticleController.create)
router.delete('/:id', ArticleController.delete)

module.exports = router