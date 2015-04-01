(function() {
  'use strict';

  module.exports = function(req, res, next) {
    console.log(req.headers.authorization);
   if (req.headers.authorization) {
      req.isAuthenticated = true;
      var token = req.headers.authorization.split(' ')[1];
      var user  = io.jwt.decode(token, 'shhh..');
      next();
    } else {
      req.isAuthenticated = false;
      var err     = new Error('Unauthorized Routes');
      err.status  = 200;
      return next(err);
    }
  };
}());
