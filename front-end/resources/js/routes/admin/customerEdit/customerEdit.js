(function() {
  'use strict';

  angular
    .module( 'app.customerEdit' )
    .controller( 'CustomerEdit', CustomerEdit );

    CustomerEdit.$inject = [ '$q', 'getCustomerInfo', 'customerEditDataService' ];

    function CustomerEdit( $q, getCustomerInfo, customerEditDataService ) {
      var vm = this;

      vm.customerData   = getCustomerInfo;
      vm.updateCustomer = updateCustomer;

      init();

      function init() {
        setCustomerDataForEdit();
      }

      function setCustomerDataForEdit() {
        vm.firstName = vm.customerData.firstName;
        vm.lastName  = vm.customerData.lastName;
        vm.department = vm.customerData.department;
        vm.position   = vm.customerData.position;
        vm.personInCharge = vm.customerData.personInCharge;
        vm.phoneNumber = vm.customerData.phoneNumber;
        vm.postalCode = vm.customerData.postalCode;
        vm.customerAdd1 = vm.customerData.customerAdd1;
        vm.customerAdd2 = vm.customerData.customerAdd2;
        vm.customerAdd3 = vm.customerData.customerAdd3;
        vm.email = vm.customerData.email;
        vm.paymentTerms = vm.customerData.paymentTerms;
      }

      function updateCustomer() {
        return $q.all( updateCustomerCallBack() )
          .then(function( response ) {
            return response;
          });
      }

      function updateCustomerCallBack() {
        return customerEditDataService
          .updateCustomerInfo( 'customerInformation',
            { id: vm.customerData._id,
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
              paymentTerms: vm.paymentTerms })
          .then(function( response ) {
            return response;
          });
      }

    }
}());
