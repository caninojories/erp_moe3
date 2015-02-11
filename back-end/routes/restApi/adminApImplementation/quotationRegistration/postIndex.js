(function() {
  'use strict';

  var io = appRequire( 'services/module.config' );

  exports.post = function( req, res, next ) {
    var date      = io.moment( req.body.date ).format('LL'),
        quotation = req.body,
        options   = {
          io      : io,
          name    : 'Quotation',
          res     : res,
          details : {
            date                  : quotation.date || '',
            quotationNumber       : quotation.quotationNumber || '',
            postalCode            : quotation.postalCode || '',
            salesRepFirstName     : quotation.salesRepFirstName || '',
            salesRepLastName      : quotation.salesRepLastName || '',
            salesOfficeAddress1   : quotation.salesOfficeAddress1 || '',
            salesOfficeAddress2   : quotation.salesOfficeAddress2 || '',
            salesOfficeAddress3   : quotation.salesOfficeAddress3 || '',
            salesOfficePhoneNumber: quotation.salesOfficePhoneNumber || '',
            customerFirstName     : quotation.customerFirstName || '',
            customerLastName      : quotation.customerLastName || '',
            subject               : quotation.subject || '',
            item: quotation.quotationObj
          }
        };

    io.mongoDB( io, io.config.dbName )
      .then(io.save(options));
  };
}());
