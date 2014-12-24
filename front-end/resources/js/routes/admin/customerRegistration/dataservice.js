(function() {
  'use strict';

  angular
    .module('app.customerRegistration')
    .factory('customerRegistrationDataService', customerRegistrationDataService);

    customerRegistrationDataService.$inject = ['exception', 'customerServiceApi'];

    function customerRegistrationDataService( exception, customerServiceApi ) {
      var service = {
        saveCustomer: saveCustomer,
        customerView: customerView
      };

      return service;

      function saveCustomer( api, param ) {
        return customerServiceApi.all( api )
          .post( param )
          .then( saveCustomerCallBack )
          .catch(function( message ) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in the saving the Customer Data', message );
          });

          function saveCustomerCallBack( response, status, header, config ) {
            return response;
          }
      }

      function customerView( api , param ){
        return customerServiceApi.one( api )
          .get( param )
          .then( customerViewCallBack )
          .catch(function( message ) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in getting the Customer View', message );
          });

        function customerViewCallBack( response, status, header, config ) {
          return response;
        }
      }

    }
}());
