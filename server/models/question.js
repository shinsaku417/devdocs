var db = require('../db.js');
var Sequelize = require('sequelize');
var User = require('./user.js');
var Answer = require('./answer.js');

var Question = db.define('Questions', {
	title: {
		Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	score: Sequelize.INTEGER
});

Question.hasMany(Answer);
Question.belongsTo(User);


Question.sync();

module.exports = Question;
