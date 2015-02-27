var db = require('../db.js');
var Sequelize = require('sequelize');
	
var Answer = require('./answer.js');
var User = require('./user.js');

var UserAnswerVotes = db.define('UserAnswerVotes', {
  vote: Sequelize.ENUM ('UP','DOWN','NONE')
});

User.belongsToMany(Answer, { through: UserAnswerVotes });
Answer.belongsToMany(User, { through: UserAnswerVotes });

module.exports = UserAnswerVotes;
