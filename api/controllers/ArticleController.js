const {Article} = require('../../models')
const es = require('../../config/es')

module.exports = {
    async index(req, res){
        try{
            articles = await Article.findAll({
                limit: 10
            })
            res.send(articles)
        }
        catch(err){
            res.status(500).send({
                error: 'An error has occured trying to get the articles'
            })
        }
    },

    async search(req, res){
        try{
            const result = await es.search({
                index: 'articles',
                type: 'articles',
                q: req.query.q
            })
            //res.send(result.hits.hits)
            const ids = result.hits.hits.map((item) => {
                return item._id
            })
            
            articles = await Article.findAll({
                where: {
                    id: ids
                }
            })
             res.send(articles)
        }
        catch(err){
            res.status(500).send({
                error: 'An error has occured trying to get the articles'
            })
        }
    },

    async create (req, res) {
        try{
            const article = await Article.create(req.body)
            res.send(article)
        }
        catch(err){
            res.status(500).send({
                error: 'An error has occured trying to create the article'
            })
        }
    },
}