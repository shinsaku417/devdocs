var jwt = require('jwt-simple');
var User = require('./models/user.js');

var secret = 'TroubledHamster';

module.exports = {
  decodeToken: function(req, res, next){
    var token = req.headers['x-access-token'];

    if(token){
      var decoded = jwt.decode(token, secret);

      User.find({where: decoded}) // TODO: make this password: decoded for clarity
        .then(function(user){
          if(user){
            next();
          } else {
            next(new Error('user does not exist'));
          }
        });

    } else {
      next(new Error('No token'));
    }
  },

  createToken: function(phone){
    return jwt.encode({phone: phone}, secret);
  }
};