(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('FromToAddressEditOne', FromToAddressEditOne);

    FromToAddressEditOne.$inject = ['$q', '$scope', '$timeout', 'commonsDataService',
    'invoiceServiceApi', 'strapAlert', 'strapModal'];

    function FromToAddressEditOne($q, $scope, $timeout, commonsDataService,
    invoiceServiceApi, strapAlert, strapModal) {
      var vm = this;

      vm.updateAddress = updateAddress;

      function updateAddress(id, api) {
        $q.all([updateAddressCallback(id, api)])
          .then(function(response) {
            if (response[0]._id !== undefined) {
              strapModal.hide();
              $timeout(function() {
                strapAlert.show(' ', $scope.companyName + ' is successfully updated ', 'success', 'alert-invoice-address-update');
                $timeout(function() {
                  strapAlert.hide();
                }, 2000);
              }, 100);
            } else {
              strapModal.hide();
              $timeout(function() {
                strapAlert.show('', 'Something went wrong', 'warning', 'alert-invoice-address-update');
                $timeout(function() {
                  strapAlert.hide();
                }, 2000);
              }, 100);
            }
          });
      }

      function updateAddressCallback(id, api) {
        return commonsDataService
          .httpPUTQueryParams(api, {
            id      : id,
            name    : $scope.companyName,
            address : $scope.address,
            country : $scope.country,
            state   : $scope.state,
            zipcode : $scope.zipcode,
            phone   : $scope.phone,
            fax     : $scope.fax,
            email   : $scope.email
          }, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }
    }

}());
