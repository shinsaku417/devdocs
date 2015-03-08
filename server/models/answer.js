var db = require('../db.js');
var Sequelize = require('sequelize');
var User = require('./user.js');

var Answer = db.define('Answers', {
	text: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Answer;
