var Question = require('../models/question.js');

module.exports = {
  load: function (req, res, next, questionID) {
    Question.find(questionID).then(function (question) {
      req.question = question;
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
