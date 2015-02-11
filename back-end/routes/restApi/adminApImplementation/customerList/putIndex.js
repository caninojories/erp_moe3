(function() {
  'use strict';

  var io = appRequire( 'services/module.config' );

  exports.putOne = function( req,res, next ) {
    var query   = io.url.parse( req.url, true ).query,
        options = {
          find: query.id,
          io      : io,
          name    : 'Customer',
          query   : query,
          res     : res,
          details : {
            firstName     : 'firstName',
            lastName      : 'lastName',
            department    : 'department',
            position      : 'position',
            personInCharge: 'personInCharge',
            phoneNumber   : 'phoneNumber',
            postalCode    : 'postalCode',
            customerAdd1  : 'customerAdd1',
            customerAdd2  : 'customerAdd2',
            customerAdd3  : 'customerAdd3',
            email         : 'email',
            paymentTerms  : 'paymentTerms'
          }
        };

    io.mongoDB(io, io.config.dbName)
      .then(io.update.putById(options));
  };
}());
