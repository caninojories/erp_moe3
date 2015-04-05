(function() {
  'use strict';

  module.exports = function(req, res, next) {
    var email     = req.body.email,
        password  = req.body.password,
        username  = req.body.username,
        err;

    if (io._.isEmpty(email) || io._.isEmpty(password)) {
      err         = new Error('Invalid Username or Password');
      err.status  = 401;
      return next(err);

    }
      var options = {
        name    : 'User',
        next    : next,
        req     : req,
        res     : res,
        details : {
          email   : email,
          password: password,
          username: username
        }
      };

      io.mongoDB(io.config.dbName);
      io.save.User(options);
  };
}());
