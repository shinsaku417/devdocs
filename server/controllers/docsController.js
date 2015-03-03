var DocElement = require('../models/docElement.js');
var DocSet = require('../models/docSet.js');
var Example = require('../models/example.js');
var Question = require('../models/question.js');
var Answer = require('../models/answer.js');

module.exports = {
  loadSet: function (req, res, next, docSetName) {
    DocSet.find({where: {name: docSetName}}).then(function (docSet) {
      if(docSet) {
        req.docSet = docSet;
        next();
      } else {
        res.status(404).send('docSet ' + docSetName + ' not found');
      }
    });
  },

  loadElement: function (req, res, next, docElementName) {
    DocElement.find({where: {
      name: docElementName,
      DocSetId: req.docSet.id
    }}).then(function(docElement) {
      if(docElement) {
        req.docElement = docElement;
        next();
      } else {
        res.status(404).send('docElement ' + docElementName + ' not found in docSet ' + req.docSet.name);
      }
    });
  },

  getSetExamples: function (req, res) {

  },

  getElementExamples: function (req, res) {
    Example.findAll({where: {
      DocElementId: req.docElement.id,
    }}).then(function(examples) {
      res.status(200).send(examples);
    });
  },

  getSetQuestions: function (req, res) {

  },

  getElementQuestions: function (req, res) {
    Question.findAll({
      where: {
        DocElementId: req.docElement.id,
      },
      include: [ Answer ],
    }).then(function(questions) {
      res.status(200).send(questions);
    });
  },

  getSetAnswers: function (req, res) {

  },

  getElementAnswers: function (req, res) {

  },

  voteSet: function (req, res) {

  },

  voteElement: function (req, res) {

  }
};
