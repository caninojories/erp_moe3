(function() {
  'use strict';

  angular
    .module('app.salesRepresentativeListing')
    .factory('salesRepresentativeListingDataService', salesRepresentativeListingDataService);
    salesRepresentativeListingDataService.$inject = ['exception', 'salesRepresentativeServiceApi'];
    function salesRepresentativeListingDataService( exception, salesRepresentativeServiceApi ) {
      var service = {
        getSalesRepresentative: getSalesRepresentative
      };
      return service;

      function getSalesRepresentative( api, param ) {
        /***
         ** Serves as List and Edit for a certain Sales Representative
        ***/
        return salesRepresentativeServiceApi.all( api )
          .getList( param )
          .then( getSalesRepresentativeCallBack )
          .catch(function( message ) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in the saving the Sales Representative Data' );
          });

          function getSalesRepresentativeCallBack( response, status, header, config ) {
            return response;
          }
      }
    }
})();
