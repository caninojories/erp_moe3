(function() {
  'use strict';

  angular
    .module( 'app.customerList' )
    .factory( 'customerDataService', customerDataService );

    customerDataService.$inject = [ 'exception', 'customerServiceApi' ];

    function customerDataService( exception, customerServiceApi ) {
      var service = {
        httpGET     : httpGET,
        httpPUT     : httpPUT,
        httpDELETE  : httpDELETE,
        getCustomer: getCustomer,
        deleteCustomer: deleteCustomer
      };

      return service;

      function getCustomer( api, param ) {
        return customerServiceApi.all( api )
          .getList( param )
          .then( getCustomerCallBack )
          .catch(function( message ){
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in getting the Customer Data', message );
          });

          function getCustomerCallBack( response, status, header, config ) {
            return response;
          }
      }

      function deleteCustomer( api, param ) {
        return customerServiceApi.all( api )
          .remove( param )
          .then( deleteCustomerCallBack )
          .catch(function( message ) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in getting the Customer Data', message );
          });

          function deleteCustomerCallBack( response, status, header, config ) {
            return response;
          }
      }

      function httpGET( api, param ) {
        return customerServiceApi.one( api )
          .get( param )
          .then( httpGETCallBack )
          .catch(function( message ) {

          });

        function httpGETCallBack( response, status, header, config ) {
          return response;
        }
      }

      function httpPUT( api, param ) {
        return customerServiceApi.one( api )
          .put( param )
          .then( httpPUTCallBack )
          .catch(function( message ) {

          });

        function httpPUTCallBack( response, status, header, config ) {
          return response;
        }
      }

      function httpDELETE( api, param ) {
        return customerServiceApi.one( api )
          .remove( param )
          .then( httpDELETECallBack )
          .catch(function() {

          });

        function httpDELETECallBack( response, status, header, config ) {
          return response;
        }
      }
    }
}());
