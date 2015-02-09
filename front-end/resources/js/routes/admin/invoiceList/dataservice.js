(function() {
  'use strict';

  angular
    .module( 'app.invoiceList' )
    .factory( 'invoiceListDataService',  invoiceListDataService );

    invoiceListDataService.$inject = [ 'invoiceServiceApi' ];

    function invoiceListDataService( invoiceServiceApi ) {
      var service = {
        httpGET    : httpGET,
        httpPUT    : httpPUT,
        httpDELETE : httpDELETE
      };

      return service;

      function httpGET( api, param ) {
        return invoiceServiceApi.one( api )
          .get( param )
          .then( httpGETCallBack )
          .catch(function( message ) {

          });

          function httpGETCallBack( response, status, header, config ) {
            return response;
          }
      }

      function httpPUT( api, param ) {
        return invoiceServiceApi.one( api )
          .put( param )
          .then( httpPUTCallBack )
          .catch(function( message ){

          });

        function httpPUTCallBack( response, status, header, config ) {
          return response;
        }
      }

      function httpDELETE( api, param ){
        return invoiceServiceApi.one( api )
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
