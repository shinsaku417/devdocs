var exampleController = require('../controllers/exampleController.js');
var jwt = require('../jwtAuth.js')


module.exports = function (app) {
  // app is injected from middlware.js
  // MOUNTED AT /api/examples/

  app.param('example', exampleController.load); //load the example data from DB

  app.get('/:example', exampleController.get);
  app.post('/', [jwt.decodeToken, exampleController.create]);
  app.get('/:example/edit', [jwt.decodeToken, exampleController.edit]);
  app.put('/:example', [jwt.decodeToken, exampleController.update]);
  app.delete('/:example', [jwt.decodeToken, exampleController.delete]);

  app.post('/:example/vote', [jwt.decodeToken, exampleController.vote]);

};
