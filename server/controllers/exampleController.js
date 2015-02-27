var Example = require('../models/example.js');

module.exports = {
  load: function (req, res, next, exampleID) {
    module.exports.find({name: exampleID}, function (example) {
      req.example = example;
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
