(function() {
  'use strict';

  angular
    .module('app.others')
    .controller('InvoiceAddress', InvoiceAddress);

    InvoiceAddress.$inject = ['$q', '$timeout', 'commonsDataService', 'invoiceServiceApi', 'strapAlert', 'strapModal'];
    /*@ngInject*/
    function InvoiceAddress($q, $timeout, commonsDataService, invoiceServiceApi, strapAlert, strapModal) {
      var vm = this;

      vm.addInvoiceFromAddress  = addInvoiceFromAddress;
      vm.addInvoiceToAddress    = addInvoiceToAddress;

      function addInvoiceFromAddress() {
        return $q.all([addInvoiceFromAddressCallback()])
          .then(function(response) {
            strapModal.hide();
            strapAlert.show('Success!', vm.name + ' is successfully saved ', 'success');

            $timeout(function() {
              strapAlert.hide();
            }, 2000);
          });
      }

      function addInvoiceFromAddressCallback() {
        return commonsDataService
          .httpPOSTQueryParams('invoiceFromAddress', {
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

      function addInvoiceToAddress() {
        return $q.all([addInvoiceToAddressCallback()])
          .then(function(response) {
            strapModal.hide();
            strapAlert.show('Success!', vm.name + ' is successfully saved ', 'success');

            $timeout(function() {
              strapAlert.hide();
            }, 2000);
          });
      }

      function addInvoiceToAddressCallback() {
        return commonsDataService
          .httpPOSTQueryParams('invoiceToAddress', {
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
