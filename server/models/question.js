var db = require('../db.js');
var Sequelize = require('sequelize');
var User = require('./user.js');
var Answer = require('./answer.js');

var Question = db.define('Questions', {
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	score: Sequelize.INTEGER
});

module.exports = Question;
