var userController = require('../controllers/userController.js');
var jwt = require('../jwtAuth.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js
  // mounted at /api/users/

  app.param('user', userController.load); // load user data from the DB

  app.post('/signin', userController.signin);

  app.post('/signup', userController.signup); // Create
  app.get('/:user', userController.get); // view profile
  app.get('/:user/edit', [jwt.decodeToken, userController.authorize, userController.edit]); // get the edit profile/settings page
  app.put('/:user', [jwt.decodeToken, userController.authorize, userController.update]); // update profile/settings with edits
  app.delete('/:user', [jwt.decodeToken, userController.authorize, userController.deactivate]); // deactivate a user. anonymize his activity if requested

};
