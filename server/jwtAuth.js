var jwt = require('jwt-simple');
var User = require('./models/user.js');

var secret = 'TroubledHamster';

module.exports = {
  decodeToken: function(req, res, next){
    var token = req.headers['x-access-token'];

    if(token){
      var decoded = jwt.decode(token, secret);

      User.find({where: decoded})
        .then(function(user){
          if(user){
            req.authedUser = user;
            //TODO validate body 
            next();
          } else {
            res.status(401).send('Invalid token');
          }
        });
    } else {
      res.status(401).send('No token');
    }
  },

  createToken: function(username){
    return jwt.encode({username: username}, secret);
  }
};