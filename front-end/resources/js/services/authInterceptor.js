(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$rootScope', 'authToken'];
    /* @ngInject */
    function authInterceptor($q, $rootScope, authToken) {
      var interceptor =  {
        request: function(config) {
          var token = authToken.getToken();
          if (token) {config.headers.Authorization = 'Bearer ' + token;}
          return config;
        },
        response: function(response) {
          return response;
        },
        responseError: function(error) {
          return $q.reject(error);
        }
      };

      return interceptor;
    }
}());
