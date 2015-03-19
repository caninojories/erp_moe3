(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('forecastUntilDate', forecastUntilDate);

    forecastUntilDate.$inject = ['$rootScope'];

    /*@ngInject*/
    function forecastUntilDate($rootScope) {
      var directive = {
        restrict: 'AEC',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        element.on('changeMonth', function() {
          // console.log(element);
        });
      }

    }
}());
