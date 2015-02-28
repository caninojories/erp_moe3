(function() {
  'use strict';

  angular
    .module('app.others')
    .controller('Others', Others);

    Others.$inject = ['strapModal'];

    function Others(strapModal) {
      var vm = this;

      vm.addInvoiceFromAddress  = addInvoiceFromAddress;
      vm.addInvoiceToAddress    = addInvoiceToAddress;

      function addInvoiceFromAddress() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/addInvoiceFromAddress.html');
      }

      function addInvoiceToAddress() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/addInvoiceToAddress.html');
      }
    }
}());
