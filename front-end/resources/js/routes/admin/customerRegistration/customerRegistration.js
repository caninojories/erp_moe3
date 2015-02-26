(function() {
  'use strict';

  angular
  .module('app.customerRegistration')
  .controller('CustomerRegistration', CustomerRegistration);

  CustomerRegistration.$inject = ['$q', '$timeout', 'strapAlert', 'formReset',
  'commonsDataService', 'customerServiceApi'];

  function CustomerRegistration($q, $timeout, strapAlert, formReset,
  commonsDataService, customerServiceApi) {
    var vm = this;

    vm.registerCustomer = registerCustomer;

    function registerCustomer(form) {
      return $q.all([registerCustomerCallBack()])
        .then(function(response) {
          strapAlert.show('Success!!',  vm.firstName + ' ' + vm.lastName +  ' has been registered');
          formReset.setResetForm(vm);
          vm.originForm = angular.copy(form);
          vm.originForm.$setPristine();
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
          return response;
        });
    }

    function registerCustomerCallBack() {
      return commonsDataService
        .httpPOST('customerRegistration', {
          firstName: vm.firstName,
          lastName: vm.lastName,
          department: vm.department,
          position: vm.position,
          personInCharge: vm.personInCharge,
          phoneNumber: vm.phoneNumber,
          postalCode: vm.postalCode,
          customerAdd1: vm.customerAdd1,
          customerAdd2: vm.customerAdd2,
          customerAdd3: vm.customerAdd3,
          email: vm.email,
          paymentTerms: vm.paymentTerms
        },
          customerServiceApi)
        .then(function(response) {
          return response;
        });
    }
  }
})();
