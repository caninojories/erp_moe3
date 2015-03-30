(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('ToAddress', ToAddress);

    ToAddress.$inject = ['$q', '$timeout', 'commonsDataService', 'invoiceServiceApi', 'strapAlert', 'strapModal'];
    /*@ngInject*/
    function ToAddress($q, $timeout, commonsDataService, invoiceServiceApi, strapAlert, strapModal) {
      var vm = this;

      vm.add            = add;

      function add() {
        return $q.all([addCallback()])
          .then(function(response) {
            strapModal.hide();
            strapAlert.show('Success!', vm.name + ' is successfully saved ', 'success');

            $timeout(function() {
              strapAlert.hide();
            }, 2000);
          });
      }

      function addCallback() {
        return commonsDataService
          .httpPOSTQueryParams('toAddress', {
            name    : vm.name,
            address : vm.address,
            country : vm.country,
            state   : vm.state,
            zipcode : vm.zipcode,
            phone   : vm.phone,
            fax     : vm.fax,
            email   : vm.email
          }, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }
    }
}());
