var DocSet = require('../models/docElement.js');
var DocElement = require('../models/docSet.js');

module.exports = {
  loadSet: function (req, res, next, docSetID) {
    DocSet.find({name: docSetID}, function (docSet) {
      req.docSet = docSet;
      next();
    });
  },

  loadElement: function (req, res, next, docElementID) {
    DocElement.find({name: docElementID}, function (docElement) {
      req.docElement = docElement;
      next();
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
