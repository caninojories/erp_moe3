(function() {
  'use strict';

  var io = appRequire( 'services/module.config' );

  exports.post = function( req, res, next ) {
    var customer  = req.body,
        options   = {
          io      : io,
          name    : 'Customer',
          res     : res,
          details : {
            firstName     : customer.firstName,
            lastName      : customer.lastName,
            department    : customer.department,
            position      : customer.position,
            personInCharge: customer.personInCharge,
            phoneNumber   : customer.phoneNumber,
            postalCode    : customer.postalCode,
            customerAdd1  : customer.customerAdd1,
            customerAdd2  : customer.customerAdd2,
            customerAdd3  : customer.customerAdd3,
            email         : customer.email,
            paymentTerms: req.body.paymentTerms
          }
        };

    io.mongoDB( io, io.config.dbName )
      .then(io.save(options));
  };
}());
