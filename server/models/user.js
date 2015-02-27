var db = require('../db.js');
var Sequelize = require('sequelize');
var Example = require('./example.js');
var Answer = require('./answer.js');
var Question = require('./question.js');

var User = db.define('Users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  karma: Sequelize.INTEGER
});

module.exports = User;
