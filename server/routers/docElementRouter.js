var docElementController = require('../controllers/docElementController.js');
var jwt = require('../jwtAuth.js')

module.exports = function (app) {
  // app is injected from middlware.js
  // MOUNTED AT /docElements/

  app.param('docElement', docElementController.load); //load the example data from DB

  app.get('/:docElement', docElementController.get);
  app.get('/:docElement/questions', docElementController.get);
  app.get('/:docElement/examples', docElementController.get);
  
  app.post('/', [jwt.decodeToken, docElementController.create]);
  app.get('/:docElement/edit', [jwt.decodeToken, docElementController.edit]);
  app.put('/:docElement', [jwt.decodeToken, docElementController.update]);
  app.delete('/:docElement', [jwt.decodeToken, docElementController.delete]);

  app.post('/:docElement/vote', [jwt.decodeToken, docElementController.vote]);

};
