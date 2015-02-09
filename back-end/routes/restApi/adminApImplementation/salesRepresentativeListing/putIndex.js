(function() {
  'use strict';

  var io = app_require( 'services/module.config' );

  exports.put = function(req, res, next) {
    var query   = io.url.parse( req.url, true).query,
        options = {
          find  : query.id,
          io    : io,
          name  : 'SalesRep',
          query : query,
          res   : res,
          details: {
            firstName           : 'firstName',
            lastName            : 'lastName',
            postalCode          : 'postalCode',
            salesOfficeAddress1 : 'salesOfficeAddress1',
            salesOfficeAddress2 : 'salesOfficeAddress2',
            salesOfficeAddress3 : 'salesOfficeAddress3'
          }
        };

    io.mongoDB(io, io.config.dbName)
      .then(io.update.putById(options));
  };
}());
