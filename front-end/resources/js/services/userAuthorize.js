(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('userAuthorize', userAuthorize);

    userAuthorize.$inject = ['$q', 'commonsDataService', 'userServiceApi'];

    function userAuthorize($q, commonsDataService, userServiceApi) {
      var user = {
        credentials: function() {
          return $q.all([user.credentialsCallback()])
            .then(function(response) {
              return response;
            });
        },
        credentialsCallback: function() {
          return commonsDataService
            .userCredentials('userCredentials', {}, userServiceApi)
            .then(function(response) {
              return response;
            });
        }
      };

      return user;
    }
}());
