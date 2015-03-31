(function() {
  'use strict';

  module.exports = function(req, res, next) {
    console.log('jories');
    if (req.headers.authorization) {
      var token = req.headers.authorization.split(' ')[1];
      var user  = io.jwt.decode(token, 'shhh..');
      res.json({message: 'User Credentials', status: 200, data: user});
    } else {
      res.json({message: 'User Credentials', status: 200, data: undefined});
    }
  };
}());
