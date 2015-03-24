(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('FromAddress', FromAddress);

    FromAddress.$inject = ['$q', '$timeout', 'commonsDataService', 'invoiceServiceApi', 'strapAlert', 'strapModal'];
    /*@ngInject*/
    function FromAddress($q, $timeout, commonsDataService, invoiceServiceApi, strapAlert, strapModal) {
      var vm = this;

      vm.add              = add;
      vm.fromAddressModal = fromAddressModal;

      function fromAddressModal() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/addInvoiceFromAddress.html');
      }

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
          .httpPOSTQueryParams('fromAddress', {
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
