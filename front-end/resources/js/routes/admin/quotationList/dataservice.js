(function() {
  'use strict';

  angular
    .module('app.quotationList')
    .factory('quotationListDataService', quotationListDataService);

    quotationListDataService.$inject = ['quotationServiceApi'];
    /*@ngInject*/
    function quotationListDataService(quotationServiceApi) {
      var service = {
        httpGET: httpGET,
        httpPUT: httpPUT,
        httpDELETE: httpDELETE
      };

      return service;

      function httpGET(api, param) {
        return quotationServiceApi.one(api)
          .get(param)
          .then(httpGETCallBack)
          .catch(function(message) {

          });

        function httpGETCallBack(response, status, header, config) {
          return response;
        }
      }

      function httpPUT(api, param) {
        return quotationServiceApi.one(api)
        .put(param)
        .then(httpPUTCallBack)
        .catch(function(message) {

        });

        function httpPUTCallBack(response, status, header, config) {
          return response;
        }
      }

      function httpDELETE(api, param) {
        return quotationServiceApi.one(api)
          .remove(param)
          .then(httpDELETECallBack)
          .catch(function(message) {

          });

        function httpDELETECallBack(response, status, header, config) {
          return response;
        }
      }
    }
}());
