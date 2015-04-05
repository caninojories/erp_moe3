(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('state', state);

    state.$inject = ['$state'];

    function state($state) {
      var stateObj = {
        unauthorized: function() {
          $state.go('401');
        }
      };

      return stateObj;
    }
}());
