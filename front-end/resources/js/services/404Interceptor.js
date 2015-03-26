(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('notFoundInterceptor', notFoundInterceptor);

    function notFoundInterceptor() {
      return {
        request: function(config) {
          return config;
        },
        response: function(response) {
          console.log(response);
          return response;
        }
      };
    }
}());
