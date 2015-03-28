(function() {
  'use strict';

  angular
    .module('app.customerRegistration')
    .factory('customerRegistrationDataService', customerRegistrationDataService);

    customerRegistrationDataService.$inject = ['exception', 'customerServiceApi'];
    /*@ngInject*/
    function customerRegistrationDataService(exception, customerServiceApi) {
      var service = {
        httpPOST: httpPOST,
      };

      return service;

      function httpPOST(api, param) {
        return customerServiceApi.all(api)
          .post(param)
          .then(httpPOSTCallBack)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in the saving the Customer Data', message);
          });

          function httpPOSTCallBack(response, status, header, config) {
            return response;
          }
      }
    }
}());
