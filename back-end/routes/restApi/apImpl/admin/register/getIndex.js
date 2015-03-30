(function() {
  'use strict';

  exports.getEmail = function(req, res, next) {
    var query = io.url.parse(req.url, true).query,
        options = {
          find: {email:query.email},
          name: 'User',
          res : res
        };
    setImmediate(function() {
      io.mongoDB(io.config.dbName);
      io.get.findOne(options);
    });
  };
}());
