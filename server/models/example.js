var db = require('../db.js');
var Sequelize = require('sequelize');
var User = require('./user.js');

var Example = db.define('Examples', {
	text: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	score: Sequelize.INTEGER
});

module.exports = Example;
