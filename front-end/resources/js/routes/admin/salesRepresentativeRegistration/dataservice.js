(function() {
  'use strict';

  angular
    .module('app.salesRepresentativeRegistration')
    .factory('salesRepresentativeRegistrationDataService', salesRepresentativeRegistrationDataService);

    salesRepresentativeRegistrationDataService.$inject = ['salesRepresentativeServiceApi', 'exception'];

    function salesRepresentativeRegistrationDataService( salesRepresentativeServiceApi, exception ) {
      var service = {
        saveSalesRepresentative: saveSalesRepresentative
      };

      return service;

      function saveSalesRepresentative( api, param ) {
        return salesRepresentativeServiceApi.all( api )
          .post( param )
          .then( saveSalesRepresentativeCallBack )
          .catch(function( message ) {
            /***
             ** Call the exception factory to show the error in the client for Development
             ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in the saving the Sales Representative Data' );
          });

        function saveSalesRepresentativeCallBack( response, status, header, config ) {
          return response;
        }
      }

    }
})();
