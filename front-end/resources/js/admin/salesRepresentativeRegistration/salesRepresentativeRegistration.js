(function() {
  'use strict';

  angular
    .module('app.salesRepresentativeRegistration')
    .controller('SalesRepresentativeRegistration', SalesRepresentativeRegistration);

    SalesRepresentativeRegistration.$inject = ['$q', 'salesRepresentativeRegistrationDataService'];

    function SalesRepresentativeRegistration( $q, salesRepresentativeRegistrationDataService ) {
      var vm = this;

      vm.registerSalesRepresentative = registerSalesRepresentative;

      function registerSalesRepresentative( firstName, lastName, postalCode, salesOfficeAdd1, salesOfficeAdd2,
        salesOfficeAdd3, salesOfficePhoneNumber) {
        return $q.all( registerSalesRepresentativeCallBack() )
          .then(function( response ) {
            return response;
          });
      }

      function registerSalesRepresentativeCallBack() {
        return salesRepresentativeRegistrationDataService
          .saveSalesRepresentative( 'saveSalesRepresentative', {firstName: vm.firstName, lastName: vm.lastName,
            postalCode: vm.postalCode, salesOfficeAdd1: vm.salesOfficeAdd1, salesOfficeAdd2: vm.salesOfficeAdd2,
            salesOfficeAdd3: vm.salesOfficeAdd3, salesOfficePhoneNumber: vm.salesOfficePhoneNumber} )
          .then(function( response ) {
            return response;
          });
      }
    }
})();
