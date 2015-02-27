var db = require('../db.js');
var Sequelize = require('sequelize');
var DocElement = require('./docElement.js');

var DocSet = db.define('DocSets', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	version: Sequelize.STRING,
	score: Sequelize.INTEGER
});

module.exports = DocSet;
