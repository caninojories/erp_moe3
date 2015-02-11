(function() {
  'use strict';

  var io = appRequire( 'services/module.config' );

  exports.putOne = function(req,res, next) {
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

    // .then(function() {
    //   io.Invoice
    //   .findById(query.id, function( err, document ) {
    //     document.date                   = query.date;
    //     document.invoiceNumber          = query.invoiceNumber;
    //     document.postalCode             = query.postalCode;
    //     document.customerFirstName      = query.customerFirstName;
    //     document.customerLastName       = query.customerLastName;
    //     document.subject                = query.subject;
    //     document.salesRepFirstName      = query.salesRepFirstName;
    //     document.salesRepLastName       = query.salesRepLastName;
    //     document.salesOfficeAddress1    = query.salesOfficeAddress1;
    //     document.salesOfficeAddress2    = query.salesOfficeAddress2;
    //     document.salesOfficeAddress3    = query.salesOfficeAddress3;
    //     document.salesOfficePhoneNumber = query.salesOfficePhoneNumber;
    //     document.item = (JSON.parse( query.item ));
    //
    //     document.save();
    //   });
    // }).then( res.json(200) );
  };
}());
