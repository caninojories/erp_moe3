(function() {
  'use strict';

  angular
    .module('app.invoiceRegistration')
    .controller('InvoiceRegistration', InvoiceRegistration);

    InvoiceRegistration.$inject = ['$rootScope', '$timeout', 'exception'];

    function InvoiceRegistration( $rootScope, $timeout, exception ) {
      var vm = this;

      vm.openDate       = openDate;
      vm.addInvoice     = addInvoice;
      vm.saveInvoice    = saveInvoice;

      vm.invoiceList = [];

      function openDate($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $rootScope.opened = true;
        setTimeout(function() {
          $rootScope.opened = false;
        }, 10);
      }

      function addInvoice() {
        vm.invoiceList.push({
          item: {
            name: vm.itemTitle || 'item',
            show: true
          },
          quantity: vm.quantity,
          unitPrice: vm.unitPrice,
          amount: vm.amount,
          status: vm.status,
          condition: vm.condition,
          remark: vm.remark,
          salesProgress: vm.salesProgress,
          SPOT: vm.SPOT,
          noteForQuotation: vm.noteForQuotation,
          comment: vm.comment,
          note: vm.note
        });

        vm.itemTitle = '';
      }

      function saveInvoice() {
        vm.tempInvoiceList = angular.copy(vm.invoiceList);
        for(var i = 0; i < vm.invoiceList.length; i++) {
          try {
            vm.tempInvoiceList[i].item = vm.values['item_' + i.toString()];
            vm.tempInvoiceList[i].quantity = vm.values['quantity_' + i.toString()];
            vm.tempInvoiceList[i].unitPrice = vm.values['unitPrice_' + i.toString()];
            vm.tempInvoiceList[i].amount    = vm.values['amount_' + i.toString()];
            vm.tempInvoiceList[i].noteForInvoice = vm.values['noteForInvoice' + i.toString()];
          }catch( error ){
            console.log( '**Use for error Messgaes**');
            console.log( 'Exception Module: cannot be seen until the debug is false' );
            exception.catcher( 'Exception Module: try catch solution: ' + error );
          }
        }
        console.log( vm.tempInvoiceList );
      }
    }
})();
