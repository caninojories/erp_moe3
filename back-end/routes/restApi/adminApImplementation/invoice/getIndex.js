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

  exports.one = function(req, res, next) {
    console.log('jories');
    var options = {
      name: 'Invoice',
      find: req.params.id,
      merge: {
        bool : true,
        findFrom: 'findFrom',
        findTo  : 'findTo'
      },
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findById(options));
  };

  exports.list = function(req, res, next) {
    var options = {
      name: 'Invoice',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findList(options));
  };

  exports.pdf = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;
    var phantom = require('phantom');
    phantom.create(function(ph){
      ph.createPage(function(page) {
        page.open('http://' + req.headers.host + '/invoice/view/' + query.id, function(status) {
          page.setPaperSize({format: 'letter'}, function(format) {
            if(status === 'success') {
              page.render(query.number + '.pdf', function(){
                var path = root(query.number + '.pdf');
                io.fse.move(path, '/Users/canino_jories/erp_moe3/' + query.number + '.pdf', {clobber: true},function(err) {
                  if (err) return console.error(err);
                  console.log("success!");
                });
                console.log('Page Rendered');
                res.json({data: 'Page Rendered'});
                ph.exit();
              });
            }
          });
        });
      });
    });
  };
}());
