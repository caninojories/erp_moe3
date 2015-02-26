(function() {
  'use strict';

  var io = appRequire('services/module.config'),
      url         = require('url');

  exports.isEmailTaken = function(req, res, next) {
    var query = url.parse(req.url, true).query,
        options = {
          name: 'User',
          res: res,
          io: io,
          find: {
            email: query.email
          }
        };

    io.mongoDB(io, io.config.dbName)
      .then(io.get.findOne(options));
  };
}());
