(function() {
  'use strict';

  module.exports = function(req, res, next) {
    var email     = req.body.email,
        password  = req.body.password;
    io.mongoDB(io.config.dbName)
      .then(findUser);

    function findUser() {
      io.User.findOne({
        email: email
      }, function(err, user) {
        if (err) {return next(err);}
        if (!user) {
          err         = new Error('Invalid Username');
          err.status  = 401;
          return next(err);
        }

        user.comparePasswords(password, function(err, isMatch) {
          console.log(isMatch);
          if (err) {return next(err);}
          if (!isMatch) {
            err         = new Error('Invalid Password');
            err.status  = 401;
            return next(err);
          }
          req.message = 'User Login';
          req.status  = 200;
          req.user    = user;
          next();
        });
      });
    }
  };
}());
