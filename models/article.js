'use strict';
const es = require('../config/es')


const saveDocument = (instance) => {
    return es.create({
        index: 'articles',
        type: 'articles',
        id: instance.dataValues.id,
        body: { title: instance.dataValues.title },
    });
}

const deleteDocument = (instance) => {
    return es.delete({
        index: 'articles',
        type: 'articles',
        id: instance.dataValues.id,
    });
}

module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        body: DataTypes.TEXT
    }, {
            hooks: {
                afterCreate: saveDocument,
                //afterUpdate: saveDocument,
                afterDestroy: deleteDocument
            }
        });
    Article.associate = function (models) {
        // associations can be defined here
    };
    return Article;
};