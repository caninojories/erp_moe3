(function() {
  'use strict';

  angular
    .module( 'app.customerList' )
    .controller( 'EditCustomerList', EditCustomerList );

    EditCustomerList.$inject = [ '$q', '$state', '$timeout', 'Restangular', '$alertModal', 'customerDataService' ];

    function EditCustomerList( $q, $state, $timeout, Restangular, $alertModal, customerDataService ) {
      var vm = this;

      vm.customerObj = null;
      vm.updateCustomer = updateCustomer;

      init();

      function init() {
        getOneCustomer();
      }

      function getOneCustomer() {
        return $q.all([getOneCustomerCallBack()])
          .then(function( response ) {
            vm.customerObj = Restangular.stripRestangular( response[0] );
            vm.firstName      = vm.customerObj.firstName;
            vm.lastName       = vm.customerObj.lastName;
            vm.department     = vm.customerObj.department;
            vm.position       = vm.customerObj.position;
            vm.personInCharge = vm.customerObj.personInCharge;
            vm.phoneNumber    = vm.customerObj.phoneNumber;
            vm.postalCode     = vm.customerObj.postalCode;
            vm.customerAdd1   = vm.customerObj.customerAdd1;
            vm.customerAdd2   = vm.customerObj.customerAdd2;
            vm.customerAdd3   = vm.customerObj.customerAdd3;
            vm.email          = vm.customerObj.email;
            vm.paymentTerms   = vm.customerObj.paymentTerms;
            return response;
          });
      }

      function getOneCustomerCallBack() {
        return customerDataService
          .httpGET( 'editCustomerList', {id: $state.params.id} )
          .then(function( response ) {
            return response;
          });
      }

      function updateCustomer( form ) {
        if( !form.$valid ) return;
        return $q.all( [updateCustomerCallBack()] )
        .then(function( response ) {
          $alertModal.show( 'Success!!', vm.firstName + ' ' + vm.lastName + ' has been updated' );
          vm.originForm = angular.copy( form );
          vm.originForm.$setPristine();
          $timeout(function() {
            $alertModal.hide();
          }, 2000);
          return response;
        });
      }

      function updateCustomerCallBack() {
        customerDataService
          .httpPUT( 'editCustomerList', {
            id:$state.params.id,
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
          })
          .then(function( response ) {
            return response;
          });
      }
    }
}());
