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

    phantom.create(function(ph) {
      ph.createPage(function(page) {
        page.open('http://' + req.headers.host + '/invoice/view/' + query.id, function(status) {
          page.setPaperSize({format: 'letter'}, function(format) {
            if (status === 'success') {
              page.render(query.number + '.pdf', function() {
                res.json({name: query.number + '.pdf'});
                ph.exit();
              });
            }
          });
        });
      });
    });
  };

  exports.forecast = function(req, res, next) {
    var query         = io.url.parse(req.url, true).query;
    var from          = io.moment(query.fromDate).format('MMMM');
    var until         = io.moment(query.untilDate).format('MMMM');
    var months        = [];
    var total         = [];
    var counterIndex  = 0;
    var sum           = 0;

    // if(from === until) {
    //   var days = io.moment(query.from).endOf('month').format('DD');
    // }

    if (query.isMonth === 'true') {
      var startDate = io.moment(query.fromDate);
      var endDate   = io.moment(query.untilDate);

      var dateDiff = endDate.diff(startDate, 'month');
      for (var i = 0; i <= dateDiff; i++) {
        (function(i) {
          setTimeout(function() {
            var fromNames = io.moment(query.fromDate).add(i, 'months').format('MMMM');
            months.push(fromNames);
            if (i === dateDiff) {
              monthsBuild();
            }
          }, 0);
        }(i));
      }
      for (var j = 0; j <= dateDiff; j++) {
        (function() {
          setTimeout(function() {
            //total.push(0);
          }, 0);
        }());
      }
    }

    function monthsBuild() {
      io.mongoDB(io.config.dbName)
        .then(function() {
          /** shows that we have same month**/
          if (months.length === 1) {
            console.log(query.fromDate);
            console.log(query.untilDate);
            monthByMonth(query.fromDate, query.untilDate);
          } else {
            for (var i = 0; i < months.length; i++) {
              var fromDate  = io.moment(query.fromDate).add(i, 'months').format('MMMM DD YYYY');
              var untilDate = io.moment(query.fromDate).add(i + 1, 'months').format('MMMM DD YYYY');
                  untilDate = io.moment(untilDate).subtract(1, 'days').format('MMMM DD YYYY');
                  (function(i, fromDate, untilDate) {
                    setTimeout(function() {
                      monthByMonth(fromDate, untilDate);
                    }, 0);
                  }(i, fromDate, untilDate));
            }
          }
        });
    }

    function monthByMonth(fromDate, untilDate) {
      io.Invoice
        .find({'date': {'$gte': fromDate, '$lte': untilDate}, currency: query.currency})
        .exec()
        .then(function(result) {
          // var sum       = 0;
          var numMonth  = null;
          var firstMonth = io.moment().month('January').format('M');
          var endMonth   = io.moment(query.fromDate).format('M');
          var dateAxis   = endMonth - firstMonth;
          for (var i = 0; i <= result.length; i++) {
            (function(i, result, fromDate, untilDate) {
              setTimeout(function() {
                if (result.length === 0) {
                  numMonth = io.moment(untilDate).format('M');
                  total.splice((numMonth - dateAxis) - 1, 0, 0);
                  counterIndex++;
                  if (counterIndex === months.length) {
                    return res.json({
                        message: 'Invoice Forecast',
                        status: 200,
                        data:{
                          series: [{
                            type: 'column',
                            name: query.name,
                            data: total
                          }],
                          xAxisCategory: months
                        },
                        pie: [{
                          type: 'pie',
                          name: 'Invoice',
                          data: [{
                            name: query.name,
                            y: total
                          }],
                          center: [100, 80],
                          size: 100,
                          showInLegend: false,
                          dataLabels: {
                              enabled: false
                          }
                        }]
                      });
                  }
                } else {
                  if (result.length !== i) {
                    numMonth = io.moment(untilDate).format('M');
                    sum += parseInt(result[i].total.split(' ')[1]);
                    console.log(sum);
                  }
                  if ((i + 1) === result.length) {
                    total.splice((numMonth - dateAxis) - 1, 0, sum);
                    counterIndex++;
                    if (counterIndex === months.length) {
                      return res.json({
                          message: 'Invoice Forecast',
                          status: 200,
                          data:{
                            series: [{
                              type: 'column',
                              name: query.name,
                              data: total
                            }],
                            xAxisCategory: months
                          },
                          pie: [{
                            type: 'pie',
                            name: 'Invoice',
                            data: [{
                              name: query.name,
                              y: total
                            }],
                            center: [100, 80],
                            size: 100,
                            showInLegend: false,
                            dataLabels: {
                                enabled: false
                            }
                          }]
                        });
                    }
                  }
                }
              }, 0);
            }(i, result, fromDate, untilDate));
          }
        });
    }
  };
}());
