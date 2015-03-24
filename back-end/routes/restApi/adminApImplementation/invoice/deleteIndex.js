(function() {
  'use strict';

  exports.one = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;
    var options = {
        find: query.id,
        io  : io,
        name: 'Invoice',
        res : res
      };

    io.mongoDB(io.config.dbName)
      .then(io.delete.findByIdAndRemove(options));
  };

  exports.from  = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;

    var options = {
      find: query.id,
      name: 'InvoiceFromAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.delete.findByIdAndRemove(options));
  };

  exports.to  = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;

    var options = {
      find: query.id,
      name: 'InvoiceToAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.delete.findByIdAndRemove(options));
  };
}());
