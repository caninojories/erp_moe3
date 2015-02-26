(function() {
  'use strict';

  angular
    .module('app.others')
    .controller('InvoiceAddress', InvoiceAddress);

    function InvoiceAddress() {
      var vm = this;

      vm.addInvoiceAddress = addInvoiceAddress;

      function addInvoiceAddress() {
        console.log('jories');
      }
    }
}());
