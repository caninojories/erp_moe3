(function() {
  'use strict';

  angular.module('app.services')
    .factory('languageToken', languageToken);

    languageToken.$inject = ['$window'];

    function languageToken($window) {
      var storage = $window.localStorage;
      var cachedToken;
      var lang = 'language';

      var langToken = {
        setToken: function(token) {
          cachedToken = token;
          storage.setItem(lang, token);
        },
        getToken: function() {
          if (!cachedToken) {
            cachedToken = storage.getItem(lang);
          }

          return cachedToken;
        },
        removeToken: function() {
          cachedToken = null;
          storage.removeItem(lang);
        }
      };

      return langToken;
    }
}());
