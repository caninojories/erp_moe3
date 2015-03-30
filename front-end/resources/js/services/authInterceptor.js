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
          return response;
        },
        responseError: function(error) {
          var $state = $injector.get('state');
          if (error.data.message === 'Unauthorized Routes' && error.data.status === 401) {
            $state.unauthorized();
          }
          return $q.reject(error);
        }
      };

      return interceptor;
    }
}());
