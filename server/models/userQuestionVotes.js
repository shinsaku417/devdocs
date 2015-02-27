var db = require('../db.js');
var Sequelize = require('sequelize');
var Question = require('./question.js');
var User = require('./user.js');

var UserQuestionVotes = db.define('UserQuestionVotes', {
  vote: Sequelize.ENUM ('UP','DOWN','NONE')
});

User.belongsToMany(Question, { through: UserQuestionVotes });
Question.belongsToMany(User, { through: UserQuestionVotes });

module.exports = UserQuestionVotes;
