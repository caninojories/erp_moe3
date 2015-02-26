(function() {
  'use strict';

  var io = appRequire('services/module.config');

  exports.putOne = function(req, res, next) {
    var query   = io.url.parse(req.url, true).query,
        options = {
          find: query.id,
          io: io,
          name: 'Quotation',
          res: res,
        };
    io.mongoDB.db(io, io.config.dbName)
      .then(io.update.putById(options));
  };
}());
