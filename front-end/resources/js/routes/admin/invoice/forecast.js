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

      $scope.$on('radioForecast', function() {
        vm.fromDate   = null;
        vm.untilDate  = null;
        /* use to update model */
        $scope.$apply(function() {
          vm.month = !vm.month;
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

      //forecastSearch();

      function forecastSearch() {
        $q.all([forecastSearchYen()])
          .then(function(yen) {
            console.log(yen[0]);
            $q.all([forecastSearchDollar()])
              .then(function(dollar) {
                console.log(dollar);
                var concatSeries = yen[0].data.series;
                vm.chartConfig.xAxis.categories = yen[0].data.xAxisCategory;
                vm.chartConfig.series   = concatSeries;
              });
          });
      }

      function forecastSearchYen() {
        console.log(moment().format('MMMM'));
        return commonsDataService
          .httpGETQueryParams('forecast', {
            fromDate  : vm.fromDate,
            untilDate : vm.tempUntilDate || vm.untilDate,
            currency  : '¥',
            name      : 'Yen',
            isMonth   : vm.month || false
          }, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      function forecastSearchDollar() {
        return commonsDataService
          .httpGETQueryParams('forecast', {
            fromDate  : vm.fromDate,
            untilDate : vm.tempUntilDate || vm.untilDate,
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
