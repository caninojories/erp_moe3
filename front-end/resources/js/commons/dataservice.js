(function() {
  'use strict';

  angular
    .module('app.commons')
    .factory('commonsDataService', commonsDataService);

    commonsDataService.$inject = ['Restangular', 'exception', 'userServiceApi'];
    /*@ngInject*/
    function commonsDataService(Restangular, exception, userServiceApi) {
      var service = {
        httpPOSTQueryParams   : httpPOSTQueryParams,
        httpGETRouteParams    : httpGETRouteParams,
        httpGETQueryParams    : httpGETQueryParams,
        httpPUTRouteParams    : httpPUTRouteParams,
        httpPUTQueryParams    : httpPUTQueryParams,
        httpDELETERouteParams : httpDELETERouteParams,
        httpDELETEQueryParams : httpDELETEQueryParams,
        userCredentials       : userCredentials,
        checkEmail            : checkEmail,
        signup                : signup,
        login                 : login,
        googleAuth            : googleAuth
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


      function httpPOSTQueryParams(api, param, apiService) {
        return apiService.all(api)
          .post(param)
          .then(httpPOSTQueryParamsCallback)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in the saving the Invoice Data', message);
          });

          function httpPOSTQueryParamsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function httpPOSTRouteParams(api, param, apiService) {
        return apiService.all(api, param)
          .post()
          .then(httpPOSTRouteParamsCallback)
          .catch(function(message) {

          });

          function httpPOSTRouteParamsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function httpPUTRouteParams(api, routeUrl, param, apiService) {
        return apiService.one(api, routeUrl)
          .put(param)
          .then(httpPUTRouteParamsCallback)
          .catch(function(message) {

          });

          function httpPUTRouteParamsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function httpPUTQueryParams(api, param, apiService) {
        return apiService.one(api)
          .put(param)
          .then(httpPUTQueryParamsCallback)
          .catch(function(message) {

          });

          function httpPUTQueryParamsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function httpDELETERouteParams(api, routeParam, apiService) {
        return apiService.one(api, routeParam)
          .remove()
          .then(httpDELETERouteParamsCallback)
          .catch(function(message) {

          });

          function httpDELETERouteParamsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function httpDELETEQueryParams(api, param, apiService) {
        return apiService.one(api)
          .remove(param)
          .then(httpDELETEQueryParamsCallback)
          .catch(function(message) {

          });

          function httpDELETEQueryParamsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function userCredentials(api, param, apiService) {
        return apiService.one(api)
          .get(param)
          .then(userCredentialsCallback)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in checking email name on all the list of User Data', message);
            return message;
          });

          function userCredentialsCallback(response, status, header, config) {
            return Restangular.stripRestangular(response);
          }
      }

      function checkEmail(api, param, apiService) {
        return apiService.one(api)
          .get(param)
          .then(checkEmailCallBack)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in checking email name on all the list of User Data', message);
            return message;
          });

          function checkEmailCallBack(response, status, header, config) {
            return Restangular.stripRestangular(response);
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
