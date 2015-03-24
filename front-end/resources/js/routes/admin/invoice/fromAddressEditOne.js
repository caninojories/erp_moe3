(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('FromAddressEditOne', FromAddressEditOne);

    FromAddressEditOne.$inject = ['commonsDataService', 'invoiceServiceApi'];

    function FromAddressEditOne(commonsDataService, invoiceServiceApi) {
      var vm = this;

      vm.updateFromAddress = updateFromAddress;

      function updateFromAddress(id) {
        console.log(id);
        $q.all([updateFromAddressCallback()])
          .then(function(response) {
            return response;
          });
      }

      function updateFromAddressCallback() {
        return commonsDataService
          .httpPUTRouteParams('fromAddress/update', id, {
            name    : vm.name,
            address : vm.address,
            country : vm.country,
            state   : vm.state,
            zipcode : vm.zipcode,
            phone   : vm.phone,
            fax     : vm.fax,
            email   : vm.email
          }, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }
    }

}());
