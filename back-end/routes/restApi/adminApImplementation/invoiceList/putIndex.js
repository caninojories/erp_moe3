(function() {
  'use strict';

  var io = appRequire('services/module.config');

  exports.putOne = function(req, res, next) {
    var query   = io.url.parse(req.url, true).query,
        options = {
          find    : query.id,
          io      : io,
          name    : 'Invoice',
          query   : query,
          res     : res,
          details : {
            date                  : 'date',
            invoiceNumber         : 'invoiceNumber',
            postalCode            : 'postalCode',
            customerFirstName     : 'customerFirstName',
            customerLastName      : 'customerLastName',
            subject               : 'subject',
            salesRepFirstName     : 'salesRepFirstName',
            salesRepLastName      : 'salesRepLastName',
            salesOfficeAddress1   : 'salesOfficeAddress1',
            salesOfficeAddress2   : 'salesOfficeAddress2',
            salesOfficeAddress3   : 'salesOfficeAddress3',
            salesOfficePhoneNumber: 'salesOfficePhoneNumber',
            item                  : 'item',
          }
        };

    io.mongoDB(io, io.config.dbName)
      .then(io.update.putById(options));
  };
}());
