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
      vm.fromLookup         = fromLookup;
      vm.saveInvoice        = saveInvoice;
      vm.taxChange          = taxChange;
      vm.toLookup           = toLookup;
      vm.xEditable          = xEditable;

      /* Variable Initialization */
      vm.invoiceList      = [];
      vm.personInCharege  = {};
      vm.subTotal         = 0;
      vm.tax              = '0';
      vm.tempSubTotal     = 0;
      vm.total            = 0;

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
        vm.subTotal     = $rootScope.currency || 0;
        vm.total        = $rootScope.currency || 0;
        var sum         = 0;
        vm.tempSubTotal = 0;
        for (var obj in vm.invoiceList) {
          sum += vm.invoiceList[obj].amount;
        }

        if (vm.tax.length !== 0 && vm.tax !== '0') {
          vm.tempSubTotal += (sum * (vm.tax/100));
          vm.tempSubTotal  += sum;
        } else {
          vm.tempSubTotal = sum;
        }

        vm.subTotal     += sum;
        vm.total        += vm.tempSubTotal;
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
            strapAlert.show('Success!', 'Invoice #' + vm.number + ' is successfully saved ', 'success', 'alert-invoice-registration');
            $timeout(function() {
              strapAlert.hide();
              $window.location.reload();
            }, 3000);
          });
      }

      function saveInvoiceCallBack() {
        vm.personInCharge = {
          firstName: vm.firstName,
          lastName: vm.lastName
        };
        return commonsDataService
          .httpPOSTQueryParams('registration', {
            number        : vm.number,
            date          : vm.date,
            terms         : vm.terms,
            dueDate       : vm.dueDate,
            from          : $rootScope.companyNameFrom,
            to            : $rootScope.companyNameTo,
            personInCharge: vm.personInCharge,
            item          : vm.invoiceList,
            currency      : $rootScope.currency,
            subTotal      : vm.subTotal,
            tax           : vm.tax,
            total         : vm.total
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
            'fromAddress/view',
            $rootScope.companyIdFrom,
            invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      function taxChange() {
        calculateSubnTotal();
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
            'toAddress/view',
            $rootScope.companyIdTo,
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
