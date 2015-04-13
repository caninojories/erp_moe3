(function() {
  'use strict';

  exports.one = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;
    var options = {
      name    : 'Invoice',
      find    : req.params.id,
      query   : query,
      res     : res,
      details : {
        number        : 'number',
        date          : 'date',
        terms         : 'terms',
        dueDate       : 'dueDate',
        from          : 'from',
        to            : 'to',
        personInCharge: 'personInCharge',
        item          : 'item',
        currency      : 'currency',
        subTotal      : 'subTotal',
        tax           : 'tax',
        total         : 'total',
      },
      itemDetails : {
        name        : 'name',
        description : 'description',
        amount      : 'amount',
        _id         : '_id'
      }
    };

    io.mongoDB(io.config.dbName)
      .then(function() {
        return io.update.putByIdParent(options);
      })
      .then(function(resultParent) {
        return io.update.putByIdChildren(options);
      })
      .then(function(resultChildren) {
        console.log(resultChildren);
        res.json({message: 'Invoice Update', status: 200, data: resultChildren});
      });
  };

  exports.status = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;
    var options = {
      name    : 'Invoice',
      find    : req.params.id,
      query   : query,
      res     : res,
      details : {
        status  : 'status',
      }
    };

    io.mongoDB(io.config.dbName)
      .then(io.update.putById(options));
  };

  exports.from = function(req, res, next) {
    var query   = io.url.parse(req.url, true).query,
        options = {
          find    : query.id,
          name    : 'InvoiceFromAddress',
          query   : query,
          res     : res,
          details : {
            name    : 'name',
            address : 'address',
            country : 'country',
            state   : 'state',
            zipcode : 'zipcode',
            phone   : 'phone',
            fax     : 'fax',
            email   : 'email'
          }
        };

    io.mongoDB(io.config.dbName)
      .then(io.update.putById(options));
  };

  exports.to = function(req, res, next) {
    var query   = io.url.parse(req.url, true).query,
        options = {
          find    : query.id,
          name    : 'InvoiceToAddress',
          query   : query,
          res     : res,
          details : {
            name    : 'name',
            address : 'address',
            country : 'country',
            state   : 'state',
            zipcode : 'zipcode',
            phone   : 'phone',
            fax     : 'fax',
            email   : 'email'
          }
        };

    io.mongoDB(io.config.dbName)
      .then(io.update.putById(options));
  };
}());
