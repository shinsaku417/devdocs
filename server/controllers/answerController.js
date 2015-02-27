var Answer = require('../models/answer.js');

module.exports = {
  load: function (req, res, next, answerID) {
    Answer.find(answerID).then(function (answer) {
      req.answer = answer;
      next();
    });
  },

  create: function (req, res, next) {

  },

  get: function (req, res, next) {

  },

  edit: function (req, res, next) {

  },

  update: function (req, res, next) {

  },

  delete: function (req, res, next) {

  },

  vote: function (req, res, next) {

  }
  
};
