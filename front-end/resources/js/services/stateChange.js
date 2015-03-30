(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('state', state);

    state.$inject = ['$state'];

    function state($state){
      var stateObj = {
        unauthorized: function() {
          console.log($state);
          $state.go('401');
        }
      };

      return stateObj;
    }
}());
