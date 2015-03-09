var Example = require('../models/example.js');
var DocSet = require('../models/docSet.js');
var DocElement = require('../models/docElement.js');

module.exports = {
  load: function (req, res, next, exampleID) {
    Example.find(exampleID).then(function (example) {
      if(example) {
        req.example = example;
        next();
      } else {
        res.status(404).send('Example ' + exampleID + ' not found');
      }
    });
  },

  authorize: function (req, res, next) {
    if (req.authedUser.id === req.example.UserId) {
      next();
    }
    else {
      res.status(401).send('Unauthorized');
    }
  },

  create: function (req, res) {
    console.log(req.body);
    DocSet.findOne({
      where: {
        name: req.body.docSetName
      }
    }).then(function(docSet){
      return DocElement.findOne({
        where: {
          DocSetId: docSet.id,
          name: req.body.docElementName
        }
      });
    }).then(function(docElement){
      var example = {
        title: req.body.title,
        text: req.body.text,
        DocElementId: docElement.id,
        UserId: req.body.UserId
      };
      Example.create(example).then(function(result) {
        //TODO branch on result instanceof Sequelize.ValidationError

        result.dataValues.User = {username: req.authedUser.username}
        res.status(200).send(result);
      });
    });
  },

  get: function (req, res) {
    res.status(200).send(req.example); //TODO mask private settings for get; leave them in for edit...?
  },

  edit: function (req, res) {
    res.status(200).send(req.example);
  },

  update: function (req, res) {
    req.example.update(req.body).then(function(result) {
      //TODO branch on result instnaceof Sequelize.ValidationError 
      res.status(200).send(result);
    });
  },

  delete: function (req, res) {
    req.example.destroy().then(function() {
      res.status(200).send('Example deleted')
    });
  },

  vote: function (req, res) {
    //TODO !
  }
  
};
