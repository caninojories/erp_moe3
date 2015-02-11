(function() {
  'use strict';

  var io = appRequire( 'services/module.config' );

  exports.delete = function(req, res, next) {
    var query   = io.url.parse( req.url, true ).query,
        options = {
          find: query.id,
          io  : io,
          name: 'SalesRep',
          res : res
        };

    io.mongoDB(io, io.config.dbName)
      .then(io.delete.findByIdAndRemove(options));
  };
}());
