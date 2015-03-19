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
      .then(io.update.putByIdParent(options))
      .then(io.update.putByIdChildren(options));
  };

  exports.status = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;
    console.log(query);
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
}());
