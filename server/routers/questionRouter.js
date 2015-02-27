var questionController = require('../controllers/questionController.js');
var jwt = require('../jwtAuth.js')


module.exports = function (app) {
  // app is injected from middlware.js
  // MOUNTED AT /api/questions/

  app.param('question', questionController.load); // load the question data from DB

  app.get('/:question', questionController.get);
  app.post('/', [jwt.decodeToken, questionController.create]);
  app.get('/:question/edit', [jwt.decodeToken, questionController.edit]);
  app.put('/:question', [jwt.decodeToken, questionController.update]);
  app.delete('/:question', [jwt.decodeToken, questionController.delete]);

  app.post('/:question/vote', [jwt.decodeToken, questionController.vote]);

};
