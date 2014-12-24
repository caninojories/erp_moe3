(function() {
  'use strict';

  angular
    .module('app.restangular')
    .factory( 'authInterceptor', authInterceptor );

  function authInterceptor( authToken ) {
    return {
      request: function( config ) {
        var token = authToken.getToken();
        if( token ) {
          console.log( 'interceptor' );
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      },
      response: function( response ) {
        return response;
      }
    };
  }
}());
