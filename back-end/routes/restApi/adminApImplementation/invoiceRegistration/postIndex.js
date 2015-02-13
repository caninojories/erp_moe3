(function() {
  'use strict';

  exports.post = function( req, res, next ) {
    var invoice = req.body,
        options = {
          io      : global.io,
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

    global.io.mongoDB( global.io, global.io.config.dbName )
      .then(global.io.save(options));
  };
}());
