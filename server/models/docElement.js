var db = require('../db.js');
var Sequelize = require('sequelize');
var Question = require('./question.js');
var Example = require('./example.js');

var DocElement = db.define('DocElements', {
  name: {
    type: Sequelize.STRING,
    unique: 'set+element',
    allowNull: false,
  },
  DocSetId: {
    type: Sequelize.INTEGER,
    unique: 'set+element',
    references: 'DocSets',
    referencesKey: 'id',
    allowNull: false
  },

  score: Sequelize.INTEGER
});

module.exports = DocElement;
