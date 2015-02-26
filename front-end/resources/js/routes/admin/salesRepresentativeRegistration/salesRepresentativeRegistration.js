(function() {
  'use strict';

  angular
    .module('app.salesRepresentativeRegistration')
    .controller('SalesRepresentativeRegistration', SalesRepresentativeRegistration);

    SalesRepresentativeRegistration.$inject = ['$q', '$timeout', 'strapAlert', 'formReset',
    'salesRepresentativeRegistrationDataService'];

    function SalesRepresentativeRegistration($q, $timeout, strapAlert, formReset,
    salesRepresentativeRegistrationDataService) {
      var vm = this;

      vm.registerSalesRepresentative = registerSalesRepresentative;

      function registerSalesRepresentative(form, firstName, lastName, postalCode, salesOfficeAdd1, salesOfficeAdd2,
        salesOfficeAdd3, salesOfficePhoneNumber) {
        if (!form.$valid) {return;}
        return $q.all([registerSalesRepresentativeCallBack()])
          .then(function(response) {
            console.log(response);
            if (response[0] === 'success') {
              strapAlert.show('Success!', firstName + ' ' + lastName + ' has been registered');
              formReset.setResetForm(vm);
              vm.originForm = angular.copy(form);
              vm.originForm.$setPristine();
              $timeout(function() {
                strapAlert.hide();
              }, 2000);
            }
            return response;
          });
      }

      function registerSalesRepresentativeCallBack() {
        return salesRepresentativeRegistrationDataService
          .saveSalesRepresentative('saveSalesRepresentative', {
            firstName: vm.firstName,
            lastName: vm.lastName,
            postalCode: vm.postalCode,
            salesOfficeAdd1: vm.salesOfficeAdd1,
            salesOfficeAdd2: vm.salesOfficeAdd2,
            salesOfficeAdd3: vm.salesOfficeAdd3,
            salesOfficePhoneNumber:
            vm.salesOfficePhoneNumber})
          .then(function(response) {
            return response;
          });
      }
    }
})();
