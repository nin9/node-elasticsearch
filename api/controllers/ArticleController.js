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

    async delete (req, res) {
        try{
            const article = await Article.findByPk(req.params.id)
            if(article){
                article.destroy()

                res.status(200).json({
                    message: 'Deleted successfully'
                })   
            }
            else{
                res.status(404).json({
                    message: 'Not found'
                })
            }
        }
        catch(err){
            res.status(500).send({
                error: 'An error has occured trying to create the article'
            })
        }
    },
}