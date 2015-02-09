(function() {
  'use strict';

  var io = app_require('services/module.config');

  exports.getList = function( req, res, next ) {
    var options = {
      io  : io,
      name: 'Customer',
      res : res,
      sort: {
        firstName: 1
      }
    };

    io.mongoDB(io, io.config.dbName )
      .then(io.get.findList(options));
  };

  exports.getOne = function( req, res, next ) {
    var query = io.url.parse( req.url, true ).query;
    io.mongoDB( io, io.config.dbName )
    .then(function() {
      io.Customer
        .findById( query.id,  callBack );
        function callBack( err, document) {
          if (err) next(err);
          res.json( 200, document );
        }
    });
  };
}());
