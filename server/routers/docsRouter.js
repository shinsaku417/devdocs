var docsController = require('../controllers/docsController.js');
var exampleController = require('../controllers/exampleController.js');
var jwt = require('../jwtAuth.js');


module.exports = function (app) {
  // app is injected from middlware.js
  // MOUNTED AT /api/docs/

  app.param('docSet', docsController.loadSet); // load the docs data from DB
  app.param('docElement', docsController.loadElement); // load the docs data from DB

  // app.get('/:docSet', docsController.getSet); // no real useful information to put here for end users...
  // app.get('/:docSet/:docElement', docsController.getElement); // no real useful information to put here for end users...

  app.get('/docElements/', docsController.getDocElements);

  app.get('/:docSet/questions', docsController.getSetQuestions);
  app.get('/:docSet/:docElement/questions/', docsController.getElementQuestions);

  app.get('/:docSet/answers/', docsController.getSetAnswers);
  app.get('/:docSet/:docElement/answers/', docsController.getElementAnswers);

  app.post('/:docSet/vote', [jwt.decodeToken, docsController.voteSet]);
  app.post('/:docSet/:docElement/vote', [jwt.decodeToken, docsController.voteElement]);

  app.get('/:docSet/:docElement/examples', docsController.getElementExamples);
  app.post('/:docSet/:docElement/examples', exampleController.create);

};
