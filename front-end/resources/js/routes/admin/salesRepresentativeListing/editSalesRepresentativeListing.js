(function() {
  'use strict';

  angular
    .module( 'app.salesRepresentativeListing' )
    .controller( 'EditSalesRepresentativeListing', EditSalesRepresentativeListing );

    EditSalesRepresentativeListing.$inject = ['$q', '$state', '$timeout', 'Restangular', 'salesRepresentativeListingDataService',
      '$alertModal', 'formReset'];

    function EditSalesRepresentativeListing( $q, $state, $timeout, Restangular, salesRepresentativeListingDataService,
      $alertModal, formReset ) {
      var vm = this;

      vm.SalesRepObj = null;
      vm.updateSalesRepresentative = updateSalesRepresentative;

      init();

      function init() {
        getOneSalesRepresentative();
      }

      function getOneSalesRepresentative() {
        return $q.all( [getOneSalesRepresentativeCallBack()])
          .then(function( response ) {
            vm.SalesRepObj = Restangular.stripRestangular( response[0] );
            console.log( vm.SalesRepObj );
            vm.firstName  = vm.SalesRepObj.firstName;
            vm.lastName   = vm.SalesRepObj.lastName;
            vm.postalCode = vm.SalesRepObj.postalCode;
            vm.salesOfficeAdd1    = vm.SalesRepObj.salesOfficeAddress1;
            vm.salesOfficeAdd2    = vm.SalesRepObj.salesOfficeAddress2;
            vm.salesOfficeAdd3    = vm.SalesRepObj.salesOfficeAddress3;
            vm.salesOfficePhoneNumber = vm.SalesRepObj.salesOfficePhoneNumber;
            return response;
          });
      }

      function getOneSalesRepresentativeCallBack() {
        return salesRepresentativeListingDataService
          .httpGET( 'salesRepresentativeList', {id:$state.params.id} )
          .then(function( response ) {
            return response;
          });
      }

      function updateSalesRepresentative( form ) {
        if( !form.$valid ) return;
        return $q.all( [updateSalesRepresentativeCallBack()] )
          .then(function( response ) {
            $alertModal.show( 'Success!!', vm.firstName + ' ' + vm.lastName + ' has been updated' );
            vm.originForm = angular.copy(form);
            vm.originForm.$setPristine();
            $timeout(function() {
              $alertModal.hide();
            }, 2000);
            return response;
        });
      }

      function updateSalesRepresentativeCallBack() {
        salesRepresentativeListingDataService
          .httpPUT( 'salesRepresentativeList', {
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
