var db = require('../db/index.js');
var Example = require('../examples/exampleModel.js');
var User = require('../users/userModel.js');

var UserExampleVotes = sequelize.define('UserExampleVotes', {
  vote: Sequelize.ENUM ('UP','DOWN','NONE')
});

User.hasMany(Example, { through: UserExampleVotes });
Example.hasMany(User, { through: UserExampleVotes });

UserExampleVotes.sync();

module.exports = UserExampleVotes;