(function() {
  'use strict';

  var io = app_require( 'services/module.config' );

  exports.getSalesRepresentativeList = function ( req, res, next ) {
    var options = {
      io  : io,
      name: 'SalesRep',
      res : res,
      sort: {firstName: 1}
    };

    io.mongoDB(io, io.config.dbName)
      .then(io.get.findList(options));
  };

  exports.getOne = function( req, res, next ) {
    var query   = io.url.parse(req.url, true).query,
        options = {
          find: query.id,
          io  : io,
          name: 'SalesRep',
          res : res
        };

    io.mongoDB(io, io.config.dbName)
      .then(io.get.findOneById(options));
  };
  })();
