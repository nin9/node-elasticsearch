'use strict';
const es = require('../config/es')


const saveDocument = (instance) => {
    console.log('hey fells ', instance.dataValues)
    return es.create({
        index: 'articles',
        type: 'articles',
        id: instance.dataValues.id,
        body: { title: instance.dataValues.title },
    });
}

module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        body: DataTypes.TEXT
    }, {
            hooks: {
                afterCreate: saveDocument,
            }
        });
    Article.associate = function (models) {
        // associations can be defined here
    };
    return Article;
};