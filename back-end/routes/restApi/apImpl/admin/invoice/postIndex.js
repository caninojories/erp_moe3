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
      .then(io.save._(options));
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
      .then(io.save._(options));
  };

  exports.one = function(req, res, next) {
    var invoice = req.body,
        options = {
          io      : global.io,
          name    : 'Invoice',
          res     : res,
          details : {
            number        : invoice.number,
            date          : invoice.date,
            terms         : invoice.terms,
            dueDate       : invoice.dueDate,
            from          : invoice.from,
            to            : invoice.to,
            personInCharge: invoice.personInCharge,
            item          : invoice.item,
            currency      : invoice.currency.trim(),
            subTotal      : invoice.subTotal,
            tax           : invoice.tax,
            total         : invoice.total
          }
        };

    io.mongoDB(io.config.dbName)
      .then(io.save._(options));
  };
}());
