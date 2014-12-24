 (function() {
  'use strict';

  angular.module( 'app.services' )
    .factory( 'authToken', authToken );

    function authToken( $window ) {
      var storage = $window.localStorage;
      var cachedToken;
      var userToken = 'userToken';

      var authUserToken = {
        setToken: function( token ) {
          cachedToken = token;
          storage.setItem( 'userToken', token );
        },
        getToken: function() {
          if( !cachedToken ) {
            cachedToken = storage.getItem( userToken );
          }

          return cachedToken;
        },
        isAuthenticated: function() {
          return !!authUserToken.getToken();
        },
        removeToken: function() {
          cachedToken = null;
          storage.removeItem( userToken );
        }
      };

      return authUserToken;
    }
}());
