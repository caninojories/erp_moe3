(function() {
  'use strict';

  exports.typeAheadfromList = function(req, res, next) {
    var query = io.url.parse(req.url, true).query,
        re    = new RegExp(query.fromName, 'i');

    var options = {
      find: {
        name: {
          $regex: re
        }
      },
      name: 'InvoiceFromAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findList(options));
  };

  exports.fromList = function(req, res, next) {
    var options = {
      name: 'InvoiceFromAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findList(options));
  };

  exports.oneFrom = function(req, res, next) {
    var options = {
      find: req.params.id,
      name: 'InvoiceFromAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findById(options));
  };

  exports.typeAheadToList = function(req, res, next) {
    var query = io.url.parse(req.url, true).query,
        re    = new RegExp(query.toName, 'i');

    var options = {
      find: {
        name: {
          $regex: re
        }
      },
      name: 'InvoiceToAddress',
      res: res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findList(options));
  };

  exports.toList = function(req, res, next) {
    var options = {
      name: 'InvoiceToAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findList(options));
  };

  exports.oneTo = function(req, res, next) {
    var options = {
      find: req.params.id,
      name: 'InvoiceToAddress',
      res : res
    };

    io.mongoDB(io.config.dbName)
      .then(io.get.findById(options));
  };

  exports.one = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;

    var options = {
      name: 'Invoice',
      find: query.id,
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
        page.onConsoleMessage(function (msg) {
          console.log("Phantom Console: " + msg);
        });
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

  exports.forecast = function(req, res, next) {
    var query   = io.url.parse(req.url, true).query;
    var from    = io.moment(query.fromDate).format('MMMM');
    var until   = io.moment(query.untilDate).format('MMMM');
    var months  = [];
    var total   = [];
    var monthsCounter = 0;


    // if(from === until) {
    //   var days = io.moment(query.from).endOf('month').format('DD');
    // }

    if (query.isMonth === 'true') {
      var startDate = io.moment(query.fromDate);
      var endDate   = io.moment(query.untilDate);

      var dateDiff = endDate.diff(startDate, 'month');
      for(var i = 0; i <= dateDiff; i++) {
        var fromNames = io.moment(query.fromDate).add(i, 'months').format('MMMM');
        months.push(fromNames);
      }

      for(var j = 0; j < dateDiff; j++) {
        total.push(0);
      }
    }

    io.async.series([
      function(callback) {
        io.mongoDB(io.config.dbName)
          .then(function() {
            /** shows that we have same month**/
            if(months.length === 1) {
              monthByMonth(query.fromDate, query.untilDate, monthsCounter);
            } else {
              for(var i = 0; i < months.length; i++) {
                var fromDate  = io.moment(query.fromDate).add(i, 'months').format('MMMM DD YYYY');
                var untilDate = io.moment(query.fromDate).add(i + 1, 'months').format('MMMM DD YYYY');
                    untilDate = io.moment(untilDate).subtract(1, 'days').format('MMMM DD YYYY');

                monthByMonth(fromDate, untilDate);
              }
            }
          });

        function monthByMonth(fromDate, untilDate) {
          console.log(fromDate);
          console.log(untilDate);
          io.Invoice
            .find({'date': {'$gte': fromDate, '$lte': untilDate}, currency: query.currency})
            .exec()
            .then(function(result) {
              var sum   = 0;
              var numMonth;
              if (result.length === 0) {
                numMonth = io.moment(untilDate).format('M');
                //total.push(0);
                monthsCounter++;
                total.splice(numMonth - 1, 0, 0);
              } else {
                numMonth = io.moment(untilDate).format('M');
                for (var i = 0; i < result.length; i++) {
                  sum += parseInt(result[i].total.split(' ')[1]);
                  console.log(parseInt(result[i].total.split(' ')[1]));
                  if((i + 1) === result.length) {
                    total.splice(numMonth - 1, 0, sum);
                    //total.push(sum);
                    monthsCounter++;
                  }
                }
              }

              callback(null, {xAxis: months, seriesData: [{name: query.name, data: total}], currency: query.currency});
            });
        }
    }], function(err, results) {
      results[0].seriesData[0].data.splice(months.length, months.length - 1);
      if (monthsCounter === months.length) {
        res.json(results);
      }
    });
  };
}());
