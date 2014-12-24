(function() {
  'use strict';

  angular
    .module( 'app.customerEdit' )
    .factory( 'customerEditDataService', customerEditDataService );

    customerEditDataService.$inject = [ 'exception', 'customerServiceApi' ];

    function customerEditDataService( exception, customerServiceApi ) {
      var service = {
        getCustomerInfo: getCustomerInfo,
        updateCustomerInfo: updateCustomerInfo
      };

      return service;

      function getCustomerInfo( api, param ) {
        return customerServiceApi.one( api )
          .get( param )
          .then( getCustomerInfoCallBack )
          .catch(function( message ) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in getting the Customer Data', message );
          });

          function getCustomerInfoCallBack( response, status, header, config ) {
            return response;
          }
      }

      function updateCustomerInfo( api, param ) {
        return customerServiceApi.one( api)
          .put( param )
          .then( updateCustomerInfoCallBack )
          .catch(function( message ) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in updating the Customer Data', message );
          });

          function updateCustomerInfoCallBack( response, status, header, config ) {
            return response;
          }
      }
    }
}());
