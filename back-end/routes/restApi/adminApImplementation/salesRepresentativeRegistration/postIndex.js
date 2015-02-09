(function() {
  'use strict';

  var io = app_require( 'services/module.config' );

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

    io.connectDB(io.config.db)
      .then(io.save(options));
  };
}());
