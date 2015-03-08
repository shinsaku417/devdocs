var db = require('../db.js');
var Sequelize = require('sequelize');
var User = require('./user.js');

var Example = db.define('Examples', {
	title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  text: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Example;
