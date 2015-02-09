(function() {
  'use strict';

  angular
    .module('app.invoiceRegistration')
    .controller('InvoiceRegistration', InvoiceRegistration);

    InvoiceRegistration.$inject = [ '$q', '$rootScope', '$timeout', 'exception', 'invoiceRegistrationDataService' ];

    function InvoiceRegistration( $q, $rootScope, $timeout, exception, invoiceRegistrationDataService ) {
      var vm = this;

      vm.addInvoice     = addInvoice;
      vm.saveInvoice    = saveInvoice;

      vm.invoiceList = [];

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
          deliveryDate: vm.deliveryDate,
          dateOfPayment: vm.dateOfPayment,
          deliveryMethod: vm.deliveryMethod,
          noteForInvoice: vm.noteForInvoice,
          accountantComment: vm.accountantComment,
          accountantNote: vm.accountantNote
        });

        vm.itemTitle = '';
      }

      function saveInvoice() {
        return $q.all( [saveInvoiceCallBack()] )
          .then(function( response ) {
            return response;
          });
      }

      function saveInvoiceCallBack() {
        return invoiceRegistrationDataService
          .httpPOST( 'invoiceRegistration', {
            date: vm.selectedDate,
            invoiceNumber: vm.invoiceNumber,
            postalCode: vm.postalCode,
            customerFirstName: vm.customerFirstName,
            customerLastName: vm.customerLastName,
            subject: vm.subject,
            salesRepFirstName: vm.salesRepFirstName,
            salesRepLastName: vm.salesRepLastName,
            salesOfficeAddress1: vm.salesOfficeAddress1,
            salesOfficeAddress2: vm.salesOfficeAddress2,
            salesOfficeAddress3: vm.salesOfficeAddress3,
            salesOfficePhoneNumber: vm.salesOfficePhoneNumber,
            item: vm.invoiceList
          })
          .then(function( response ) {
            return response;
          });
      }
    }
})();
