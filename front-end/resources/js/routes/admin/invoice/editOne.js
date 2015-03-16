(function() {
  'use strict';

  angular
  .module('app.invoice')
  .controller('EditOne', EditOne);

  EditOne.$inject = ['$q', '$rootScope', '$scope', '$stateParams', '$timeout', '$window',
  'commonsDataService', 'invoiceServiceApi', 'strapModal', 'strapAlert'];

  function EditOne($q, $rootScope, $scope, $stateParams, $timeout, $window,
  commonsDataService, invoiceServiceApi, strapModal, strapAlert) {
    var vm = this;

    vm.addInvoice         = addInvoice;
    vm.afterSave          = afterSave;
    vm.calculateSubnTotal = calculateSubnTotal;
    vm.cancel             = cancel;
    vm.invoiceUpdateOne   = invoiceUpdateOne;
    vm.itemList           = [];
    vm.fromLookup         = fromLookup;
    vm.toLookup           = toLookup;
    vm.xEditable          = xEditable;

    invoiceGetOne();

    $scope.$on('select2', function() {
      /* use to update model after listening changes in the dropdown currency menu */
      $scope.$apply(calculateSubnTotal());
    });

    function addInvoice() {
      vm.itemList.push({
        name: vm.itemTitle || 'item',
        description: vm.description,
        amount: vm.amount,
        show: false
      });

      vm.itemTitle = '';
    }

    function afterSave(invoice) {
      invoice.show  = !invoice.show;
      console.log(invoice);
    }

    function calculateSubnTotal() {
      vm.subTotal = $rootScope.currency || 0;
      vm.total    = $rootScope.currency || 0;
      var sum = 0;
      for (var obj in vm.itemList) {
        sum += vm.itemList[obj].amount;
      }

      vm.subTotal += sum;
      vm.total    += sum;
    }

    function cancel(invoice) {
      invoice.show = !invoice.show;
    }

    function invoiceGetOne() {
      return $q.all([invoiceGetOneCallback()])
        .then(function(response) {
          vm.obj = response[0];
          vm.number                   = vm.obj.data.number;
          vm.date                     = vm.obj.data.date;
          vm.terms                    = vm.obj.data.terms;
          vm.dueDate                  = vm.obj.data.dueDate;
          $rootScope.companyNameFrom  = vm.obj.data.from;
          $rootScope.companyNameTo    = vm.obj.data.to;
          vm.itemList                 = vm.obj.data.item;
          vm.subTotal                 = vm.obj.data.subTotal;
          vm.total                    = vm.obj.data.total;
          $scope.$broadcast('currency', vm.obj.data.currency);
          return response;
        });
    }

    function invoiceGetOneCallback() {
      return commonsDataService
        .httpGETRouteParams('view', $stateParams.id, invoiceServiceApi)
        .then(function(response) {
          return response;
        });
    }

    function invoiceUpdateOne() {
      return $q.all([invoiceUpdateOneCallBack()])
        .then(function(response) {
          console.log(response);
          if (response[0].number !== undefined) {
            strapAlert.show('Success!', 'Invoice #' + vm.number + ' is successfully updated ', 'success', 'alert-invoice-update');
          }
          $timeout(function() {
            strapAlert.hide();
            $window.location.reload();
          }, 3000);
        });
    }

    function invoiceUpdateOneCallBack() {
      var itemList = [];
      itemList.push(vm.itemList);
      return commonsDataService
        .httpPUT('update', $stateParams.id, {
          number  : vm.number,
          date    : vm.date,
          terms   : vm.terms,
          dueDate : vm.dueDate,
          from    : $rootScope.companyNameFrom,
          to      : $rootScope.companyNameTo,
          item    : itemList,
          currency: $rootScope.currency,
          subTotal: vm.subTotal,
          total   : vm.total
        }, invoiceServiceApi)
        .then(function(response) {
          return response;
        });
    }

    function fromLookup() {
      console.log('jories');
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
      console.log(invoice);
      invoice.show = !invoice.show;
    }
  }
}());
