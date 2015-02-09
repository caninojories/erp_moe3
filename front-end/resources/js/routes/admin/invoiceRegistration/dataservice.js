(function() {
  'use strict';

  angular
    .module( 'app.invoiceRegistration')
    .factory( 'invoiceRegistrationDataService', invoiceRegistrationDataService );

    invoiceRegistrationDataService.$inject = [ 'invoiceServiceApi' ];

    function invoiceRegistrationDataService( invoiceServiceApi ) {
      var service = {
        httpPOST: httpPOST
      };

      return service;

      function httpPOST( api, param ) {
        return invoiceServiceApi.all( api )
          .post( param )
          .then( httpPOSTCallBack )
          .catch(function( message ) {

          });

        function httpPOSTCallBack( response, status, header, config ) {
          return response;
        }
      }
    }
}());
