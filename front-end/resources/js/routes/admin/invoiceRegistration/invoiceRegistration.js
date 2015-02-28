(function() {
  'use strict';

  angular
    .module('app.invoiceRegistration')
    .controller('InvoiceRegistration', InvoiceRegistration);

    InvoiceRegistration.$inject = ['$q', '$rootScope', '$scope', '$timeout', 'exception', 'commonsDataService',
    'invoiceServiceApi', 'invoiceRegistrationDataService', 'viewContentLoaded', 'strapModal'];

    function InvoiceRegistration($q, $rootScope, $scope, $timeout, exception, commonsDataService,
    invoiceServiceApi, invoiceRegistrationDataService, viewContentLoaded, strapModal) {
      var vm = this;

      /* Functions */
      vm.afterSave    = afterSave;
      vm.addInvoice   = addInvoice;
      vm.deleteItem   = deleteItem;
      vm.saveInvoice  = saveInvoice;
      vm.fromLookup   = fromLookup;
      vm.toLookup     = toLookup;
      vm.xEditable    = xEditable;

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
        return $q.all([saveInvoiceCallBack()])
          .then(function(response) {
            return response;
          });
      }

      function saveInvoiceCallBack() {
        return invoiceRegistrationDataService
          .httpPOST('invoiceRegistration', {
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
          .then(function(response) {
            return response;
          });
      }

      function fromLookup() {
        return $q.all([fromLookupCallback()])
          .then(function(response) {
            if(response[0].name !== undefined) {
              $rootScope.companyName = $rootScope.companyNameFrom;
              var obj = response[0];
              $rootScope.address  = obj.address;
              $rootScope.country  = obj.country;
              $rootScope.state    = obj.state;
              $rootScope.zipcode  = obj.zipcode;
              $rootScope.phone    = obj.phone;
              $rootScope.fax      = obj.fax;
              $rootScope.email    = obj.email;
              strapModal.show('am-fade-and-slide-top', 'center', 'commons/viewInvoiceAddress.html');
            }
          });
      }

      function fromLookupCallback() {
        return commonsDataService
          .httpGETRouteParams(
            'invoiceFromAddress/view',
            $rootScope.companyNameFrom,
            invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      function toLookup() {
        return $q.all([tolookupCallback()])
          .then(function(response) {
            if(response[0].name !== undefined) {
              $rootScope.companyName = $rootScope.companyNameTo;
              var obj = response[0];
              $rootScope.address  = obj.address;
              $rootScope.country  = obj.country;
              $rootScope.state    = obj.state;
              $rootScope.zipcode  = obj.zipcode;
              $rootScope.phone    = obj.phone;
              $rootScope.fax      = obj.fax;
              $rootScope.email    = obj.email;
              strapModal.show('am-fade-and-slide-top', 'center', 'commons/viewInvoiceAddress.html');
            }
          });
      }

      function tolookupCallback() {
        return commonsDataService
          .httpGETRouteParams(
            'invoiceToAddress/view',
            $rootScope.companyNameTo,
            invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      function xEditable(invoice) {
        invoice.show = false;
      }
    }
})();
