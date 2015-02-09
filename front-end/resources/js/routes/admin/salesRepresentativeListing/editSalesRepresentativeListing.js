(function() {
  'use strict';

  angular
    .module( 'app.salesRepresentativeListing' )
    .controller( 'EditSalesRepresentativeListing', EditSalesRepresentativeListing );

    EditSalesRepresentativeListing.$inject = ['$q', '$state', '$timeout', 'Restangular', 'salesRepresentativeListingDataService',
      'strapAlert', 'formReset'];

    function EditSalesRepresentativeListing( $q, $state, $timeout, Restangular, salesRepresentativeListingDataService,
      strapAlert, formReset ) {
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
            vm.firstName              = vm.SalesRepObj.firstName;
            vm.lastName               = vm.SalesRepObj.lastName;
            vm.postalCode             = vm.SalesRepObj.postalCode;
            vm.salesOfficeAddress1    = vm.SalesRepObj.salesOfficeAddress1;
            vm.salesOfficeAddress2    = vm.SalesRepObj.salesOfficeAddress2;
            vm.salesOfficeAddress3    = vm.SalesRepObj.salesOfficeAddress3;
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
            strapAlert.show( 'Success!!', vm.firstName + ' ' + vm.lastName + ' has been updated' );
            vm.originForm = angular.copy(form);
            vm.originForm.$setPristine();
            $timeout(function() {
              strapAlert.hide();
            }, 2000);
            return response;
        });
      }

      function updateSalesRepresentativeCallBack() {
        return salesRepresentativeListingDataService
          .httpPUT( 'salesRepresentativeList', {
            id                    :$state.params.id,
            firstName             : vm.firstName,
            lastName              : vm.lastName,
            postalCode            : vm.postalCode,
            salesOfficeAddress1   : vm.salesOfficeAddress1,
            salesOfficeAddress2   : vm.salesOfficeAddress2,
            salesOfficeAddress3   : vm.salesOfficeAddress3,
            salesOfficePhoneNumber:vm.salesOfficePhoneNumber
          })
          .then(function( response ) {
            return response;
          });
      }
    }
}());
