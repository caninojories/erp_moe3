(function() {
  'use strict';

  var io = appRequire('services/module.config');

  exports.getSalesRepresentativeList = function (req, res, next) {
    var options = {
      io  : global.io,
      name: 'SalesRep',
      res : res,
      sort: {firstName: 1}
    };

    //console.log(global.io.config.dbName);
    global.io.mongoDB(global.io, global.io.config.dbName)
      .then(global.io.get.findList(options));
  };

  exports.getOne = function(req, res, next) {
    var query   = io.url.parse(req.url, true).query,
        options = {
          find: query.id,
          io  : global.io,
          name: 'SalesRep',
          res : res
        };

    global.io.mongoDB(global.io, global.io.config.dbName)
      .then(global.io.get.findOneById(options));
  };
  })();
