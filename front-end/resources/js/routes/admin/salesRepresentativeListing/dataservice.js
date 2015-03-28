(function() {
  'use strict';

  angular
    .module('app.salesRepresentativeListing')
    .factory('salesRepresentativeListingDataService', salesRepresentativeListingDataService);

    salesRepresentativeListingDataService.$inject = ['$state', 'exception', 'salesRepresentativeServiceApi'];
    /*@ngInject*/
    function salesRepresentativeListingDataService($state, exception, salesRepresentativeServiceApi) {
      var service = {
        getSalesRepresentative: getSalesRepresentative,
        httpDelete : httpDelete,
        httpGET    : httpGET,
        httpPUT    : httpPUT
      };
      return service;

      function getSalesRepresentative(api, param) {
        /***
         ** Serves as List and Edit for a certain Sales Representative
        ***/
        return salesRepresentativeServiceApi.all(api)
          .getList(param)
          .then(getSalesRepresentativeCallBack)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in getting the Sales Representative Data');
            //$state.go('primary');
          });

          function getSalesRepresentativeCallBack(response, status, header, config) {
            return response;
          }
      }

      function httpDelete(api, param) {
        return salesRepresentativeServiceApi.all(api)
          .remove(param)
          .then(httpDeleteCallBack)
          .catch(function(message) {

          });

        function httpDeleteCallBack(response, status, header, config) {
          return response;
        }

      }

      function httpGET(api, param) {
        return salesRepresentativeServiceApi.one(api)
          .get(param)
          .then(httpGETCallBack)
          .catch(function(message) {

          });

        function httpGETCallBack(response, status, header, config) {
          return response;
        }
      }

      function httpPUT(api, param) {
        return salesRepresentativeServiceApi.one(api)
          .put(param)
          .then(httpPUTCallBack)
          .catch(function(message) {

          });

        function httpPUTCallBack(response, status, config, header) {
          return response;
        }
      }
    }
})();
