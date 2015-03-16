(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('Registration', Registration);

    Registration.$inject = ['$q', '$rootScope', '$scope', '$timeout', '$window', 'exception', 'strapAlert',
    'strapModal', 'commonsDataService', 'invoiceServiceApi'];

    function Registration($q, $rootScope, $scope, $timeout, $window, exception, strapAlert,
    strapModal, commonsDataService, invoiceServiceApi) {
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
        /* use to update model after listening changes in the dropdown currency menu */
        $scope.$apply(calculateSubnTotal());
      });

      function calculateSubnTotal() {
        vm.subTotal = $rootScope.currency || 0;
        vm.total    = $rootScope.currency || 0;
        var sum = 0;
        for (var obj in vm.invoiceList) {
          sum += vm.invoiceList[obj].amount;
        }

        vm.subTotal += sum;
        vm.total    += sum;
        console.log(vm.subTotal);

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
            console.log(response);
            strapAlert.show('Success!', 'Invoice #' + vm.number + ' is successfully saved ', 'success', 'alert-invoice-registration');
            $timeout(function() {
              strapAlert.hide();
              $window.location.reload();
            }, 3000);
          });
      }

      function saveInvoiceCallBack() {
        return commonsDataService
          .httpPOSTQueryParams('registration', {
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
          }, invoiceServiceApi)
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
