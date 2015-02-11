(function() {
  'use strict';

  var io = appRequire( 'services/module.config' );

  exports.saveSalesRepresentative = function( req, res, next ) {
    var salesRep = req.body,
        options = {
          io      : io,
          name    : 'SalesRep',
          res     : res,
          details : {
            firstName: salesRep.firstName,
            lastName: salesRep.lastName,
            postalCode: salesRep.postalCode,
            salesOfficeAddress1: salesRep.salesOfficeAdd1,
            salesOfficeAddress2: salesRep.salesOfficeAdd2 || null,
            salesOfficeAddress3: salesRep.salesOfficeAdd3 || null,
            salesOfficePhoneNumber: salesRep.salesOfficePhoneNumber
          }
        };

    io.mongoDB(io, io.config.dbName)
      .then(io.save(options));
  };
}());
