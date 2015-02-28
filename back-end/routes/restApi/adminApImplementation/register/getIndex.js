(function() {
  'use strict';

  exports.getEmail = function(req, res, next) {
    var query = global.io.url.parse(req.url, true).query,
        options = {
          find: {email:query.email},
          io  : global.io,
          name: 'User',
          res : res
        };
        console.log(query);

    global.io.mongoDB(io.config.dbName)
      .then(global.io.get.findOne(options));
  };
}());
