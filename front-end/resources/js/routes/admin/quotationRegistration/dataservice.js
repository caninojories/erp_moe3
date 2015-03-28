(function() {
  'use strict';

  angular
    .module('app.quotationRegistration')
    .factory('quotationRegistrationDataService', quotationRegistrationDataService);

    quotationRegistrationDataService.$inject = ['quotationServiceApi'];
    /*@ngInject*/
    function quotationRegistrationDataService(quotationServiceApi) {
      var service = {
        httpPOST : httpPOST
      };

      return service;

      function httpPOST(api, param) {
        console.log(api, param);
        return quotationServiceApi.all(api)
          .post(param)
          .then(httpPOSTCallBack)
          .catch(function(message) {

          });

        function httpPOSTCallBack(response, status, header, config) {
          return response;
        }
      }
    }
}());
