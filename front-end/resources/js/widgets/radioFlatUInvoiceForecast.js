(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('radioInvoiceForecast', radioInvoiceForecast);

    radioInvoiceForecast.$inject = ['$rootScope'];
    /*@ngInject*/
    function radioInvoiceForecast($rootScope) {
      var directive = {
        restrict: 'AEC',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        element.radiocheck();
        element.on('click', function() {
          scope.$broadcast('radioForecast');
        });
      }

    }
}());
