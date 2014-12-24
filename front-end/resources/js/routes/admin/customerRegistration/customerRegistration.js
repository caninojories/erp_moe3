(function() {
  'use strict';

  angular
  .module('app.customerRegistration')
  .controller('CustomerRegistration', CustomerRegistration);

  CustomerRegistration.$inject = ['$q', 'customerRegistrationDataService'];

  function CustomerRegistration( $q, customerRegistrationDataService ) {
    var vm = this;

    vm.registerCustomer = registerCustomer;

    init();

    function init() {
      customerViewCallBack();
    }

    function customerView() {
      return $q.all( [customerViewCallBack()])
        .then(function( response ) {
          console.log( response );
          return response;
        });
    }

    function customerViewCallBack() {
      return customerRegistrationDataService
        .customerView( 'getCustomerView', {} )
        .then(function( response ) {
          return response;
        });
    }

    function registerCustomer() {
      return $q.all( registerCustomerCallBack() )
        .then(function( response ) {
          return response;
        });
    }

    function registerCustomerCallBack() {
      return customerRegistrationDataService
        .saveCustomer( 'saveCustomer', {firstName: vm.firstName,
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
          paymentTerms: vm.paymentTerms} )
        .then(function( response ) {
          return response;
        });
    }
  }
})();
