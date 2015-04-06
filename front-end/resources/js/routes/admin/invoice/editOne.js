(function() {
  'use strict';

  angular
  .module('app.invoice')
  .controller('EditOne', EditOne);

  EditOne.$inject = ['$q', '$rootScope', '$scope', '$stateParams', '$timeout', '$window',
  'commonsDataService', 'invoiceServiceApi', 'strapModal', 'strapAlert'];
  /*@ngInject*/
  function EditOne($q, $rootScope, $scope, $stateParams, $timeout, $window,
  commonsDataService, invoiceServiceApi, strapModal, strapAlert) {
    var vm = this;

    vm.addInvoice         = addInvoice;
    vm.afterSave          = afterSave;
    vm.calculateSubnTotal = calculateSubnTotal;
    vm.cancel             = cancel;
    vm.deleteItem         = deleteItem;
    vm.updateOne          = updateOne;
    vm.itemList           = [];
    vm.fromLookup         = fromLookup;
    vm.taxChange          = taxChange;
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
    }

    function calculateSubnTotal() {
      vm.subTotal     = $rootScope.currency || 0;
      vm.total        = $rootScope.currency || 0;
      var sum         = 0;
      vm.tempSubTotal = 0;

      for (var obj in vm.itemList) {
        if (vm.itemList.hasOwnProperty(obj)) {
          sum += vm.itemList[obj].amount;
        }
      }

      if (vm.tax.length !== 0 && vm.tax !== '0') {
        vm.tempSubTotal += (sum * (vm.tax / 100));
        vm.tempSubTotal  += sum;
      } else {
        vm.tempSubTotal = sum;
      }

      vm.subTotal     += sum;
      vm.total        += vm.tempSubTotal;
    }

    function cancel(invoice) {
      invoice.show = !invoice.show;
    }

    function deleteItem(invoice) {
      var position = vm.itemList.indexOf(invoice);
      vm.itemList.splice(position, 1);
      calculateSubnTotal();
    }

    function invoiceGetOne() {
      return $q.all([invoiceGetOneCallback()])
        .then(function(response) {
          console.log(response[0]);
          vm.obj                      = response[0];
          vm.number                   = vm.obj.data.number;
          vm.date                     = vm.obj.data.date;
          vm.terms                    = vm.obj.data.terms;
          vm.dueDate                  = vm.obj.data.dueDate;
          $rootScope.companyNameFrom  = vm.obj.from.name;
          vm.companyIdFrom            = vm.obj.from._id;
          $rootScope.companyNameTo    = vm.obj.to.name;
          vm.companyIdTo              = vm.obj.to._id;
          vm.firstName                = vm.obj.data.personInCharge.firstName;
          vm.lastName                 = vm.obj.data.personInCharge.lastName;
          vm.itemList                 = vm.obj.data.item;
          vm.subTotal                 = vm.obj.data.subTotal;
          vm.tax                      = vm.obj.data.tax;
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

    function updateOne() {
      return $q.all([updateOneCallback()])
        .then(function(response) {
          console.log(response);
          if (response[0].number !== undefined) {
            strapAlert.show('Success!', 'Invoice #' + vm.number + ' is successfully updated ', 'success',
            'alert-invoice-update');
          }
          $timeout(function() {
            strapAlert.hide();
            $window.location.reload();
          }, 3000);
        });
    }

    function updateOneCallback() {
      var itemList = [];
      itemList.push(vm.itemList);
      vm.personInCharge = {
        firstName: vm.firstName,
        lastName: vm.lastName
      };
      return commonsDataService
        .httpPUTRouteParams('update', $stateParams.id, {
          number        : vm.number,
          date          : vm.date,
          terms         : vm.terms,
          dueDate       : vm.dueDate,
          from          : vm.companyIdFrom,
          to            : vm.companyIdTo,
          personInCharge: vm.personInCharge,
          item          : itemList,
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
          console.log(response);
          if (response[0].name !== undefined) {
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
      console.log(vm.companyIdFrom);
      return commonsDataService
        .httpGETRouteParams(
          'fromAddress/view',
          vm.companyIdFrom,
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
          if (response[0].name !== undefined) {
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
          vm.companyIdTo,
          invoiceServiceApi)
        .then(function(response) {
          return response;
        });
    }

    function xEditable(invoice) {
      invoice.show = !invoice.show;
    }
  }
}());
