(function() {
  'use strict';

  var jwt   = require('jwt-simple');

  exports.getOne = function(req, res, next) {
    // if (!req.headers.authorization) {
    //   return res.status(401).send({
    //     message: 'You are not authorized'
    //   });
    // }
    //
    // var token = req.headers.authorization.split(' ')[1];
    // var payLoad = jwt.decode(token, 'shhh..');
    //
    // if (!payLoad.sub) {
    //   return res.status(401).send({
    //      message: 'Authentication failed'
    //   });
    // }
    res.status(201).send({response: 'success'});
  };
}());
