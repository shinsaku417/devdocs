var db = require('../db.js');
var Sequelize = require('sequelize');
var Example = require('./example.js');
var Answer = require('./answer.js');
var Question = require('./question.js');

var User = db.define('Users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  karma: Sequelize.INTEGER
});

User.hasMany(Question);
User.hasMany(Answer);
User.hasMany(Example);
// User.hasMany(Tips);
// User.hasMany(Feedback);

User.sync()
  .complete(function(err){
    if(!!err) {
      console.log('An error occurred while creating the User table: ', err);
    } else {
      console.log('User table created');
    }
  });

module.exports = User;
