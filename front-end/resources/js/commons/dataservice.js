(function() {
  'use strict';

  angular
    .module('app.commons')
    .factory('commonsDataService', commonsDataService);

    commonsDataService.$inject = ['Restangular', 'exception', 'userServiceApi'];

    function commonsDataService(Restangular, exception, userServiceApi) {
      var service = {
        httpPOST            : httpPOST,
        httpGETRouteParams  : httpGETRouteParams,
        httpGETQueryParams  : httpGETQueryParams,
        checkEmail          : checkEmail,
        signup              : signup,
        login               : login,
        googleAuth          : googleAuth
      };

      return service;

      function httpGETQueryParams(api, queryParam, apiService) {
        return apiService.one(api)
          .get(queryParam)
          .then(httpGETQueryParamsCallback)
          .catch(function(message) {

          });

          function httpGETQueryParamsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function httpGETRouteParams(api, routeParam, apiService) {
        return apiService.one(api, routeParam)
          .get()
          .then(httpGETRouteParamsCallback)
          .catch(function(message) {
            
          });

          function httpGETRouteParamsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function httpPOST(api, param, apiService) {
        return apiService.all(api)
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
            return Restangular.stripRestangular(response);
          }
      }

      function checkEmail(api, param) {
        return userServiceApi.one(api)
          .get(param)
          .then(checkEmailCallBack)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in checking email name on all the list of User Data', message);
          });

          function checkEmailCallBack(response, status, header, config) {
            return response;
          }
      }

      function signup(api, param) {
        return userServiceApi.all(api)
          .post(param)
          .then(signupCallBack)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in the saving the User upon Sign-up', message);
          });

        function signupCallBack(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }

      function login(api, param) {
        return userServiceApi.all(api)
          .post(param)
          .then(loginCallBack)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in login in the user', message);
          });

        function loginCallBack(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }

      function googleAuth(api, param) {
        return userServiceApi.all(api)
          .post(param)
          .then(googleAuthCallBack)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in login in the user using Google', message);
          });

        function googleAuthCallBack(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }
    }
})();
