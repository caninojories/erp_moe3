(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('languageInterceptor', languageInterceptor);

    languageInterceptor.$inject = ['languageToken'];
    /* @ngInject */
    function languageInterceptor(languageToken) {
      return {
        request: function(config) {
          var token = languageToken.getToken();
          if (token) {config.headers.Language = 'lang ' + token;}
          return config;
        },
        response: function(response) {
          return response;
        }
      };
    }
}());
