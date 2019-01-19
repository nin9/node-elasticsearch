const {Article} = require('../../models')

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