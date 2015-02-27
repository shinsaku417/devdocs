var db = require('../db.js');
var Sequelize = require('sequelize');
var User = require('./user.js');

var Answer = db.define('Answers', {
	text: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	score: Sequelize.INTEGER
});

Answer.belongsTo(User);

Answer.sync();

module.exports = Answer;
