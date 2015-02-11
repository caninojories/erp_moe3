(function() {
  'use strict';

  exports.getList = function( req, res, next ) {
    var options = {
      io  : global.io,
      name: 'Customer',
      res : res,
      sort: {
        firstName: 1
      }
    };

    global.io.mongoDB(global.io, global.io.config.dbName )
      .then(global.io.get.findList(options));
  };

  exports.getOne = function( req, res, next ) {
    var query = global.io.url.parse( req.url, true ).query;
    global.io.mongoDB( global.io, global.io.config.dbName )
    .then(function() {
      global.io.Customer
        .findById( query.id,  callBack );
        function callBack( err, document) {
          if (err) next(err);
          res.json( 200, document );
        }
    });
  };
}());
