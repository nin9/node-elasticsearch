module.exports = {
    index(req, res){
        res.status(200).json({
            message: 'articles all!'
        })
    },

    create(req, res){
        res.status(200).json({
            message: 'articles post!'
        })
    }
}