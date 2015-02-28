var DocElement = require('../models/docElement.js');
var DocSet = require('../models/docSet.js');

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
    next();
  },

  loadElement: function (req, res, next, docElementName) {
    DocElement.find({where: {
      name: docElementName,
      DocSetId: req.docSet.id
    }}).then(function(docElement) {
      req.docElement = docElement;
      next();
    });
  },

  getSetExamples: function (req, res, next) {

  },

  getElementExamples: function (req, res, next) {
    Example.findAll({where: {
      DocElementId: req.docElement.id,
    }}).then(function(examples) {
      res.status(200).send(examples);
    });
  },

  getSetQuestions: function (req, res, next) {

  },

  getElementQuestions: function (req, res, next) {

  },

  getSetAnswers: function (req, res, next) {

  },

  getElementAnswers: function (req, res, next) {

  },

  voteSet: function (req, res, next) {

  },

  voteElement: function (req, res, next) {

  }
};
