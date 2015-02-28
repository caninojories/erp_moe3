(function() {
  'use strict';

  angular
    .module('app.others')
    .controller('InvoiceAddress', InvoiceAddress);

    InvoiceAddress.$inject = ['$q', 'commonsDataService', 'invoiceServiceApi'];

    function InvoiceAddress($q, commonsDataService, invoiceServiceApi) {
      var vm = this;

      vm.addInvoiceFromAddress  = addInvoiceFromAddress;
      vm.addInvoiceToAddress    = addInvoiceToAddress;

      function addInvoiceFromAddress() {
        return $q.all([addInvoiceFromAddressCallback()])
          .then(function(response) {
            return response;
          });
      }

      function addInvoiceFromAddressCallback() {
        return commonsDataService
          .httpPOST('invoiceFromAddress', {
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
            return response;
          });
      }

      function addInvoiceToAddressCallback() {
        return commonsDataService
          .httpPOST('invoiceToAddress', {
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
