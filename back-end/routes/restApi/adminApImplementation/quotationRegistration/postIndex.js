(function() {
  'use strict';

  exports.post = function(req, res, next) {
    var date      = global.io.moment(req.body.date).format('LL'),
        quotation = req.body,
        options   = {
          io      : global.io,
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

    global.io.mongoDB(global.io, global.io.config.dbName)
      .then(global.io.save(options));
  };
}());
