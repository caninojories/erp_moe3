(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('Forecast', Forecast);

    Forecast.$inject = ['$q', '$rootScope', '$scope', 'commonsDataService', 'invoiceServiceApi'];
    /*@ngInject*/
    function Forecast($q, $rootScope, $scope, commonsDataService, invoiceServiceApi) {
      var vm = this;

      vm.forecastSearch   = forecastSearch;
      vm.untilDateChange  = untilDateChange;
      vm.month            = true;

      $scope.$on('radioForecast', function(env, value) {
        vm.fromDate   = null;
        vm.untilDate  = null;
        /* use to update model */
        $scope.$apply(function() {
          if (value !== 'true') {
            vm.month = false;
          } else {
            vm.month = true;
          }
        });
      });

      vm.chartConfig = {
        options: {
          chart: {
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50,
                viewDistance: 25
            }
        },
          plotOptions: {
           column: {
              depth: 25
           }
          }
        },
        xAxis: {
          categories: ['Jan', 'Feb']
        },
        yAxis: {
          title: {
              text: 'Amount'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        series: [{
          name: '',
          data: [
            [3, 5]
          ],
        }],
        title: {
          text: 'Invoice'
        },
        credits: {
          enabled: true
        },
        loading: false,
        size: {}
      };

      forecastSearch(moment().startOf('month').format('MMMM DD YYYY'), moment().endOf('month').format('MMMM DD YYYY'));
      function forecastSearch(startDate, endDate) {
        if (startDate === undefined && (vm.fromDate === undefined || vm.untilDate === undefined)) {
          return;
        }
        $q.all([forecastSearchYen(startDate, endDate)])
          .then(function(yen) {
            console.log(yen);
            $q.all([forecastSearchDollar(startDate, endDate)])
              .then(function(dollar) {
                var pie = [{
                  type: 'pie',
                  name: 'Invoice',
                  data: [],
                  center: [50, 10],
                  size: 100,
                  showInLegend: false,
                  dataLabels: {
                    enabled: false
                  }
                }];

                if (vm.month) {
                  var yenTotal = yen[0].pie[0].data[0].y;
                  var yenTemp  = 0;
                  yenTotal.forEach(function(value) {
                    yenTemp += value;
                  });
                  var dollarTotal = dollar[0].pie[0].data[0].y;
                  var dollarTemp  = 0;
                  dollarTotal.forEach(function(value) {
                    dollarTemp += value;
                  });
                  pie[0].data.push({name: yen[0].pie[0].data[0].name, y: yenTemp});
                  pie[0].data.push({name: dollar[0].pie[0].data[0].name, y: dollarTemp});
                }

                var concatSeries = yen[0].data.series.concat(dollar[0].data.series);
                concatSeries = concatSeries.concat(pie);
                vm.chartConfig.xAxis.categories = yen[0].data.xAxisCategory;
                vm.chartConfig.series   = concatSeries;
              });
          });
      }

      function forecastSearchYen(startDate, endDate) {
        return commonsDataService
          .httpGETQueryParams('forecast', {
            fromDate  : startDate || vm.fromDate,
            untilDate : endDate || vm.tempUntilDate || vm.untilDate,
            currency  : '¥',
            name      : 'Yen',
            isMonth   : vm.month || false
          }, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      function forecastSearchDollar(startDate, endDate) {
        return commonsDataService
          .httpGETQueryParams('forecast', {
            fromDate  : startDate || vm.fromDate,
            untilDate : endDate || vm.tempUntilDate || vm.untilDate,
            currency  : '$',
            name      : 'Dollar',
            isMonth   : vm.month || false
          }, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      var oldDate;
      var newDate;
      function untilDateChange() {
        vm.tempUntilDate = moment(vm.untilDate).endOf('months').format('MMMM DD YYYY');
      }
    }
}());
