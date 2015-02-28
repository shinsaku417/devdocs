var Question = require('../models/question.js');

module.exports = {
  load: function (req, res, next, questionID) {
    Question.find(questionID).then(function (question) {
      if (question) {
        req.question = question;
        next();
      } else {
        res.status(404).send('Question ' + quesitonID  + ' not found');
      }
    });
  },

  authorize: function (req, res, next) {
    if (req.authedUser.id === req.question.UserId) {
      next();
    }
    else {
      res.status(401).send('Unauthorized');
    }
  },

  create: function (req, res) {
    Question.create(req.body).then(function(result) {
      //TODO branch on result instanceof Sequelize.ValidaitonError
      res.status(200).send(result);
    });
  },

  get: function (req, res) {
    res.status(200).send(req.question); //TODO mask private settings for get; leave them in for edit...?
  },

  edit: function (req, res) {
    res.status(200).send(req.question);
  },

  update: function (req, res) {
    req.question.update(req.body).then(function(result) {
      //TODO branch on result instnaceof Sequelize.ValidationError 
      res.status(200).send(result);
    });
  },

  delete: function (req, res) {
    req.question.destroy().then(function() {
      res.status(200).send('Question deleted')
    });
  },

  vote: function (req, res) {
    //TODO !
  }
  
};
