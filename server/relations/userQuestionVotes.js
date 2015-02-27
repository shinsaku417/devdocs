var db = require('../db/index.js');
var Question = require('../questions/questionModel.js');
var User = require('../users/userModel.js');

//USERS' VOTES ON QUESTIONS
var UserQuestionVotes = sequelize.define('UserQuestionVotes', {
  vote: Sequelize.ENUM ('UP','DOWN','NONE')
});

User.hasMany(Question, { through: UserQuestionVotes });
Question.hasMany(User, { through: UserQuestionVotes });

UserQuestionVotes.sync();

module.exports = UserQuestionVotes;