(function() {
  'use strict';

  exports.from = function(req, res, next) {
    var options = {
      name: 'InvoiceFromAddress',
      res: res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findList(options));
  };

  exports.oneFrom = function(req, res, next) {
    var options = {
      find: {name: req.params.companyName},
      name: 'InvoiceFromAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findOne(options));
  };

  exports.to = function(req, res, next) {
    var options = {
      name: 'InvoiceToAddress',
      res: res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findList(options));
  };

  exports.oneTo = function(req, res, next) {
    var options = {
      find: {name: req.params.companyName},
      name: 'InvoiceToAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findOne(options));
  };
}());
