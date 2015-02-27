var Answer = require('../models/answer.js');

module.exports = {
  load: function (req, res, next, answerID) {
    Answer.find(answerID).then(function (answer) {
      if(answer) {
        req.answer = answer;
        next();
      } else {
        res.status(404).send('Answer ' + answerID + ' not found');
      }
    });
  },

  authorize: function (req, res, next) {
    if (req.authedUser.id === req.answer.UserID) {
      next();
    }
    else {
      res.status(401).send('Unauthorized');
    }
  },
 
  create: function (req, res) {
    Answer.create(req.body).then(function(result) {
      //TODO branch on result instanceof Sequelize.ValidaitonError
      res.status(200).send(result);
    });
  },

  get: function (req, res) {
    res.status(200).send(req.answer); //TODO mask private settings for get; leave them in for edit...?
  },

  edit: function (req, res) {
    res.status(200).send(req.answer);
  },

  update: function (req, res) {
    req.answer.update(req.body).then(function(result) {
      //TODO branch on result instnaceof Sequelize.ValidationError 
      res.status(200).send(result);
    });
  },

  delete: function (req, res) {
    req.answer.destroy().then(function() {
      res.status(200).send('Answer deleted')
    });
  },

  vote: function (req, res) {
    //TODO !
  }
  
};
