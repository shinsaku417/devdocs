var db = require('../db.js');
var Sequelize = require('sequelize');
var Question = require('./question.js');
var Example = require('./example.js');

var DocElement = db.define('DocElements', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: Sequelize.INTEGER
});

module.exports = DocElement;
