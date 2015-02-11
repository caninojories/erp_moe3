(function() {
  'use strict';

  var io = appRequire( 'services/module.config' );

  exports.post = function( req, res, next ) {
    var invoice = req.body,
        options = {
          io      : io,
          name    : 'Invoice',
          res     : res,
          details : {
            date                  : invoice.date,
            invoiceNumber         : invoice.invoiceNumber,
            postalCode            : invoice.postalCode,
            customerFirstName     : invoice.customerFirstName,
            customerLastName      : invoice.customerLastName,
            subject               : invoice.subject,
            salesRepFirstName     : invoice.salesRepFirstName,
            salesRepLastName      : invoice.salesRepLastName,
            salesOfficeAddress1   : invoice.salesOfficeAddress1,
            salesOfficeAddress2   : invoice.salesOfficeAddress2,
            salesOfficeAddress3   : invoice.salesOfficeAddress3,
            salesOfficePhoneNumber: invoice.salesOfficePhoneNumber,
            item                  : invoice.item
          }
        };

    io.mongoDB( io, io.config.dbName )
      .then(io.save(options));
  };
}());
