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

      io.mongoDB(io.config.dbName)
        .then(io.save.User(options));
    // io.mongoDB(io.config.dbName)
    //   .then(findUser);
    //
    // function findUser() {
    //   io.User.findOne({
    //     email: email
    //   }, function(err, user) {
    //     if (err) {return next(err);}
    //     if (!user) {
    //       err         = new Error('Invalid Username');
    //       err.status  = 401;
    //       return next(err);
    //     }
    //
    //     user.comparePasswords(password, function(err, isMatch) {
    //       if (err) {return next(err);}
    //       if (!isMatch) {
    //         err         = new Error('Invalid Password');
    //         err.status  = 401;
    //         return next(err);
    //       }
    //       req.message = 'User Login';
    //       req.status  = 'success';
    //       next();
    //     });
    //   });
    // }
  };
}());
