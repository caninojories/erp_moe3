(function() {
  'use strict';

  exports.post = function(req, res, next) {
    console.log(req.body);
    var invoice = req.body,
        options = {
          io      : global.io,
          name    : 'Invoice',
          res     : res,
          details : {
            number  : invoice.number,
            date    : invoice.date,
            terms   : invoice.terms,
            dueDate : invoice.dueDate,
            from    : invoice.from,
            to      : invoice.to,
            item    : invoice.item,
            currency: invoice.currency.trim(),
            subTotal: invoice.subTotal,
            total   : invoice.total
          }
        };

    io.mongoDB(io.config.dbName)
      .then(global.io.save(options));
  };
}());
