(function() {
  'use strict';

  angular
    .module('app.salesRepresentative')
    .controller('SalesRepresentativeRegistration', SalesRepresentativeRegistration);

    SalesRepresentativeRegistration.$inject = ['$q', '$timeout', '$window', 'strapAlert', 'formReset',
      'commonsDataService', 'salesRepresentativeServiceApi'];
    /*@ngInject*/
    function SalesRepresentativeRegistration($q, $timeout, $window, strapAlert, formReset,
      commonsDataService, salesRepresentativeServiceApi) {
        var vm = this;

        vm.registerSalesRepresentative = registerSalesRepresentative;

        function registerSalesRepresentative(form, firstName, lastName, postalCode, salesOfficeAdd1, salesOfficeAdd2,
          salesOfficeAdd3, salesOfficePhoneNumber) {
          if (!form.$valid) {return;}
          return $q.all([registerSalesRepresentativeCallBack()])
            .then(function(response) {
              if (response[0].data._id !== undefined) {
                strapAlert.show('Success!', firstName + ' ' + lastName + ' has been registered', 'success',
                  'alert-salesRep-registration');
                formReset.setResetForm(vm);
                vm.originForm = angular.copy(form);
                vm.originForm.$setPristine();
                $timeout(function() {
                  strapAlert.hide();
                  $window.location.reload();
                }, 2000);
              }
              return response;
            });
        }

        function registerSalesRepresentativeCallBack() {
          return commonsDataService
            .httpPOSTQueryParams('registration', {
              firstName   : vm.firstName,
              lastName    : vm.lastName,
              phoneNumber :vm.phoneNumber,
              address     : vm.address,
              city        : vm.city,
              postalCode  : vm.postalCode
            }, salesRepresentativeServiceApi)
            .then(function(response) {
              return response;
            });
        }
    }
})();
