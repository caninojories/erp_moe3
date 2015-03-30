(function() {
  'use strict';

  exports.saveSalesRepresentative = function(req, res, next) {
    var salesRep = req.body,
        options = {
          io      : global.io,
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

    global.io.mongoDB(global.io, global.io.config.dbName)
      .then(global.io.save(options));
  };
}());
