(function() {
  'use strict';

  angular
    .module('app.others')
    .controller('Others', Others);

    Others.$inject = ['strapModal'];

    function Others(strapModal) {
      var vm = this;

      vm.addInvoiceAddress = addInvoiceAddress;

      function addInvoiceAddress() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/addInvoiceAddress.html');
      }
    }
}());
