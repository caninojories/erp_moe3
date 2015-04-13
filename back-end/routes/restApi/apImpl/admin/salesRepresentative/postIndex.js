(function() {
  'use strict';

  exports.one = function(req, res, next) {
    var salesRep = req.body,
        options = {
          io      : global.io,
          name    : 'SalesRep',
          res     : res,
          details : {
            firstName   : salesRep.firstName,
            lastName    : salesRep.lastName,
            phoneNumber : salesRep.phoneNumber,
            address     : salesRep.address,
            city        : salesRep.city,
            postalCode  : salesRep.postalCode
          }
        };

    io.mongoDB(io.config.dbName)
      .then(io.save._(options));
  };
}());
