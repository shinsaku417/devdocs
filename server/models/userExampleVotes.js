var db = require('../db.js');
var Sequelize = require('sequelize');
var Example = require('./example.js');
var User = require('./user.js');

var UserExampleVotes = db.define('UserExampleVotes', {
  vote: Sequelize.ENUM ('UP','DOWN','NONE')
});

User.belongsToMany(Example, { through: UserExampleVotes });
Example.belongsToMany(User, { through: UserExampleVotes });

module.exports = UserExampleVotes;
