(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('FromAddressViewList', FromAddressViewList);

    FromAddressViewList.$inject = ['$compile', '$q', '$rootScope', '$scope', '$timeout', '$window', 'DTInstances',
    'DTOptionsBuilder', 'DTColumnBuilder', 'commonsDataService', 'invoiceServiceApi', 'strapAlert', 'strapModal'];
    /*@ngInject*/
    function FromAddressViewList($compile, $q, $rootScope, $scope, $timeout, $window, DTInstances,
    DTOptionsBuilder, DTColumnBuilder, commonsDataService, invoiceServiceApi, strapAlert, strapModal) {
      var vm = this;

      vm.id  = null;

      $scope.edit = function(id) {
        return $q.all([fromLookupCallback(id)])
          .then(function(response) {
            if (response[0].name !== undefined) {
              $rootScope.companyName  = response[0].name;
              $rootScope.addressId    = id;
              $rootScope.api          = 'fromAddress';
              var obj             = response[0];
              $rootScope.address  = obj.address;
              $rootScope.country  = obj.country;
              $rootScope.state    = obj.state;
              $rootScope.zipcode  = obj.zipcode;
              $rootScope.phone    = obj.phone;
              $rootScope.fax      = obj.fax;
              $rootScope.email    = obj.email;
              strapModal.show('am-fade-and-slide-top', 'center', 'commons/editInvoiceAddress.html');
            }
          });
      };

      function fromLookupCallback(id) {
        return commonsDataService
          .httpGETRouteParams(
            'fromAddress/view',
            id,
            invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      $scope.delete = function(id) {
        vm.id = id;
        strapModal.show('am-fade-and-scale', 'center', 'commons/confirmDelete.html');
      };

      $rootScope.deleteData = function(data) {
        if (data === true) {
          return $q.all([deleteCallBack()])
            .then(function(response) {
              $timeout(function() {
                vm.dtInstance.reloadData();
              }, 200);
              return response;
            });
        }
      };

      function deleteCallBack(id) {
        return commonsDataService
          .httpDELETEQueryParams('fromAddress', {id:vm.id}, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      $scope.update = function() {

      };

      $scope.dtOptions = DTOptionsBuilder.fromSource($window.location.origin + '/invoiceApi/fromAddress/view/list')
        .withBootstrap()
        .withBootstrapOptions({
          pagination: {
            classes: {
              ul: 'pagination-plain'
            }
           }
         })
        .withOption('createdRow', function(row, data, dataIndex) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
        });

        $scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
          .renderWith(function(data, type, full, meta) {
            return '<a href="" ng-click=edit(\'' + data._id + '\')' + ' class="top-margin">' +
            '<button class="btn btn-xs btn-warning">' +
            '<i class="ion-compose"></i>' +
            '</button></a>&nbsp;' +
            '<button class="btn btn-xs btn-danger top-margin" ng-click="delete(\'' + (data._id.toString()) + '\')">' +
            '<i class="ion-backspace"></i>' +
            '</button>';
          }),
          DTColumnBuilder.newColumn('name').withTitle('Company Name').notSortable()
        ];

      return DTInstances.getLast().then(function (dtInstance) {
        vm.dtInstance = dtInstance;
      });
    }
}());
