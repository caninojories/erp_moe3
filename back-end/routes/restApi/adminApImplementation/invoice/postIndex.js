(function() {
  'use strict';

  exports.from = function(req, res, next) {
    var options = {
      name    : 'InvoiceFromAddress',
      res     : res,
      details : {
        name    : req.body.name,
        address : req.body.address,
        country : req.body.country,
        state   : req.body.state,
        zipcode : req.body.zipcode,
        phone   : req.body.phone,
        fax     : req.body.fax,
        email   : req.body.email
      }
    };

    io.mongoDB(io.config.dbName)
      .then(io.save(options));
  };

  exports.to = function(req, res, next) {
    var options = {
      name    : 'InvoiceToAddress',
      res     : res,
      details : {
        name    : req.body.name,
        address : req.body.address,
        country : req.body.country,
        state   : req.body.state,
        zipcode : req.body.zipcode,
        phone   : req.body.phone,
        fax     : req.body.fax,
        email   : req.body.email
      }
    };

    io.mongoDB(io.config.dbName)
      .then(io.save(options));
  };
}());
