(function(){
  'use strict';

  var io = appRequire( 'services/module.config' );

  exports.deleteOne = function(req, res, next) {
    var query   = io.url.parse( req.url, true ).query,
        options = {
          find: query.id,
          io  : io,
          name: 'Invoice',
          res : res
        };

    io.mongoDB(io, io.config.dbName)
      .then(io.delete.findByIdAndRemove(options));
  };
}());
