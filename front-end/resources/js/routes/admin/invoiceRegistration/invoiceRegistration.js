(function() {
  'use strict';

  angular
    .module('app.invoiceRegistration')
    .controller('InvoiceRegistration', InvoiceRegistration);

    InvoiceRegistration.$inject = [ '$q', '$rootScope', '$scope', '$timeout', 'exception', 'invoiceRegistrationDataService', 'viewContentLoaded' ];

    function InvoiceRegistration( $q, $rootScope, $scope, $timeout, exception, invoiceRegistrationDataService, viewContentLoaded ) {
      var vm = this;

      vm.afterSave      = afterSave;
      vm.addInvoice     = addInvoice;
      vm.deleteItem     = deleteItem;
      vm.saveInvoice    = saveInvoice;
      vm.xEditable      = xEditable;

      vm.invoiceList = [];

      function addInvoice() {
        vm.invoiceList.push({
          name: vm.itemTitle || 'item',
          quantity: vm.quantity,
          unitPrice: vm.unitPrice,
          amount: vm.amount,
          status: vm.status,
          deliveryDate: vm.deliveryDate,
          dateOfPayment: vm.dateOfPayment,
          deliveryMethod: vm.deliveryMethod,
          noteForInvoice: vm.noteForInvoice,
          accountantComment: vm.accountantComment,
          accountantNote: vm.accountantNote,
          show: true
        });

        vm.itemTitle = '';
      }

      function afterSave(invoice) {
        invoice.show = true;
      }

      function deleteItem(invoice) {
        var position = vm.invoiceList.indexOf(invoice);
        vm.invoiceList.splice(position, 1);
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

      function xEditable(invoice) {
        console.log(invoice);
        invoice.show = false;
      }
    }
})();
