(function() {
  'use strict';

  angular
    .module( 'app.quotationList' )
    .factory( 'quotationListDataService', quotationListDataService );

    quotationListDataService.$inject = ['quotationServiceApi'];

    function quotationListDataService( quotationServiceApi ) {
      var service = {
        httpGET: httpGET,
        httpDELETE: httpDELETE
      };

      return service;

      function httpGET() {

      }

      function httpDELETE( api, param ) {
        return quotationServiceApi.one( api )
          .remove( param )
          .then( httpDELETECallBack )
          .catch(function( message ) {

          });

        function httpDELETECallBack( response, status, header, config ) {
          return response;
        }
      }
    }
}());
