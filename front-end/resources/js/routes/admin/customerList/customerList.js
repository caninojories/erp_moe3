(function() {
  'use strict';

  angular
    .module('app.customerList')
    .controller('CustomerList', CustomerList);

    CustomerList.$inject = ['$q', '$compile', '$scope', '$timeout', '$window',
    'Restangular', 'DTInstances', 'DTOptionsBuilder', 'DTColumnBuilder', 'customerDataService'];
    /*@ngInject*/
    function CustomerList($q, $compile, $scope, $timeout, $window,
      Restangular, DTInstances, DTOptionsBuilder, DTColumnBuilder, customerDataService) {
      var vm = this;

      $scope.delete = function(id) {
        $q.all([deleteCallBack(id)])
        .then(function(response) {
          $timeout(function() {
            vm.dtInstance.reloadData();
          }, 200);
          return response;
        });
      };

      function deleteCallBack(id) {
        customerDataService
          .httpDELETE('customerList', {id: id})
          .then(function(response) {
            return response;
          });
      }

      $scope.dtOptions = DTOptionsBuilder.fromSource($window.location.origin + '/customerApi/customerList')
        .withTableTools('/js/vendor/table-tools/swf/copy_csv_xls_pdf.swf')
        .withTableToolsButtons([
          'copy',
          'print', {
            'sExtends': 'collection',
            'sButtonText': 'Save',
            'aButtons': ['csv', 'pdf'],
          }
          ])
          .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
          });

          $scope.dtColumns = [
          DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
          .renderWith(function(data, type, full, meta) {
            return '<a href="/customerList/edit/' + data._id + '">' +
            '<button class="btn btn-xs btn-warning">' +
            '<i class="ion-compose"></i>' +
            '</button></a>&nbsp;' +
            '<button class="btn btn-xs btn-danger" ng-click="delete(\'' + (data._id.toString()) + '\')">' +
            '<i class="ion-backspace"></i>' +
            '</button>';
          }),
          DTColumnBuilder.newColumn('firstName')
            .withTitle('First name')
            .notSortable(),
          DTColumnBuilder.newColumn('lastName')
            .withTitle('Last name')
            .notSortable(),
          DTColumnBuilder.newColumn('department')
            .withTitle('Department')
            .notSortable(),
          DTColumnBuilder.newColumn('position')
            .withTitle('Sales Office Address 1')
            .notSortable(),
          DTColumnBuilder.newColumn('personInCharge')
            .withTitle('Person In Charge')
            .withOption('defaultContent', '')
            .notSortable(),
          DTColumnBuilder.newColumn('postalCode')
            .withTitle('Postal Code')
            .withOption('defaultContent', '')
            .notSortable(),
          DTColumnBuilder.newColumn('customerAdd1')
            .withTitle('Customer Address 1')
            .notSortable(),
          DTColumnBuilder.newColumn('customerAdd2')
            .withTitle('Customer Address 2')
            .notSortable(),
          DTColumnBuilder.newColumn('customerAdd3')
            .withTitle('Customer Address 3')
              .notSortable(),
          DTColumnBuilder.newColumn('email')
            .withTitle('Email')
            .notSortable(),
          DTColumnBuilder.newColumn('paymentTerms')
            .withTitle('Payment Terms')
            .notSortable(),
          ];

      return DTInstances.getLast().then(function (dtInstance) {
        vm.dtInstance = dtInstance;
      });
    }
}());
