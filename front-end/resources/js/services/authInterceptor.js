(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$injector', '$q', '$rootScope', '$window', 'authToken'];
    /* @ngInject */
    function authInterceptor($injector, $q, $rootScope, $window, authToken) {
      var interceptor =  {
        request: function(config) {
          var token = authToken.getToken();
          if (token) {config.headers.Authorization = 'Bearer ' + token;}
          return config;
        },
        response: function(response) {
          if (response.data.message === 'Unauthorized Routes' && response.data.status === 200) {
            $rootScope.error = true;
          } else {
            $rootScope.error = false;
          }
          return response;
        },
        responseError: function(error) {
          return $q.reject(error);
        }
      };

      return interceptor;
    }
}());
