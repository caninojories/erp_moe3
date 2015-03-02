(function() {
  'use strict';

  angular
    .module('app.invoiceRegistration')
    .controller('InvoiceRegistration', InvoiceRegistration);

    InvoiceRegistration.$inject = ['$q', '$rootScope', '$scope', '$timeout', 'exception', 'commonsDataService',
    'invoiceServiceApi', 'invoiceRegistrationDataService', 'strapModal'];

    function InvoiceRegistration($q, $rootScope, $scope, $timeout, exception, commonsDataService,
    invoiceServiceApi, invoiceRegistrationDataService, strapModal) {
      var vm = this;

      /* Functions */
      vm.afterSave          = afterSave;
      vm.addInvoice         = addInvoice;
      vm.calculateSubnTotal = calculateSubnTotal;
      vm.cancel             = cancel;
      vm.deleteItem         = deleteItem;
      vm.saveInvoice        = saveInvoice;
      vm.fromLookup         = fromLookup;
      vm.toLookup           = toLookup;
      vm.xEditable          = xEditable;

      /* Variable Initialization */
      vm.subTotal     = null;
      vm.total        = null;
      vm.invoiceList  = [];

      function addInvoice() {
        vm.invoiceList.push({
          name: vm.itemTitle || 'item',
          description: vm.description,
          amount: vm.amount,
          show: true
        });

        vm.itemTitle = '';
      }

      function afterSave(invoice) {
        invoice.show = true;
      }

      $scope.$on('select2', function() {
        $scope.$apply(calculateSubnTotal());
      });

      function calculateSubnTotal() {
        vm.subTotal = $rootScope.currency;
        vm.total    = $rootScope.currency;
        var sum = 0;
        for (var obj in vm.invoiceList) {
            sum += vm.invoiceList[obj].amount;
        }

        vm.subTotal += sum;
        vm.total    += sum;
      }

      function cancel(invoice) {
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
            number  : vm.number,
            date    : vm.date,
            terms   : vm.terms,
            dueDate : vm.dueDate,
            from    : $rootScope.companyNameFrom,
            to      : $rootScope.companyNameTo,
            item    : vm.invoiceList,
            currency: $rootScope.currency,
            subTotal: vm.subTotal,
            total   : vm.total
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
