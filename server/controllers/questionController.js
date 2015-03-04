var Question = require('../models/question.js');
var DocSet = require('../models/docSet.js');
var DocElement = require('../models/docElement.js');

module.exports = {
  load: function (req, res, next, questionID) {
    Question.find(questionID).then(function (question) {
      if (question) {
        req.question = question;
        next();
      } else {
        res.status(404).send('Question ' + questionID  + ' not found');
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
    DocSet.findOne({
      where: {
        name: req.body.docSetName
      }
    }).then(function(docSet) {
      return DocElement.findOne({
        where: {
          name: req.body.docElementName,
          DocSetId: docSet.id
        }
      });
    }).then(function(docElement) {
      var question = {
        title: req.body.title,
        text: req.body.text,
        UserId: req.body.UserId,
        DocElementId: docElement.id
      }
      Question.create(question).then(function(result) {
        //TODO branch on result instanceof Sequelize.ValidaitonError
        var createdQuestion = result.dataValues;
        createdQuestion.Answers = [];
        res.status(200).send(createdQuestion);
      });
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
