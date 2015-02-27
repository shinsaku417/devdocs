var answerController = require('../controllers/answerController.js');
var jwt = require('../jwtAuth.js')


module.exports = function (app) {
  // app is injected from middlware.js
  // MOUNTED AT /api/answers/

  app.param('answer', answerController.load); //load the answer data from DB

  app.get('/:answer', answerController.get);
  app.post('/', [jwt.decodeToken, answerController.create]);
  app.get('/:answer/edit', [jwt.decodeToken, answerController.edit]);
  app.put('/:answer', [jwt.decodeToken, answerController.update]);
  app.delete('/:answer', [jwt.decodeToken, answerController.delete]);

  app.post('/:answer/vote', [jwt.decodeToken, answerController.vote]);

};
