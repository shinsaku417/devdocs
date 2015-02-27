var db = require('../db/index.js');
var Answer = require('../answers/answerModel.js');
var User = require('../users/userModel.js');

var UserAnswerVotes = sequelize.define('UserAnswerVotes', {
  vote: Sequelize.ENUM ('UP','DOWN','NONE')
});

User.hasMany(Answer, { through: UserAnswerVotes });
Answer.hasMany(User, { through: UserAnswerVotes });

UserAnswerVotes.sync();

module.exports = UserAnswerVotes;