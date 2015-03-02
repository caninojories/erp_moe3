(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('select2FlatUi', select2FlatUi);

    select2FlatUi.$inject = ['$rootScope'];

    function select2FlatUi($rootScope) {
      var directive = {
        restrict: 'AEC',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        element.select2({dropdownCssClass: 'dropdown-inverse'});
        currencySymbol(element.val());
        element.on('change', function(e) {
          currencySymbol(e.val);
          scope.$broadcast('select2');
        });
      }

      function currencySymbol(currency) {
        switch(currency) {
          case 'Yen':
            $rootScope.currency = '¥ ';
            break;
          case 'Dollar':
            $rootScope.currency = '$ ';
            break;
        }
      }
    }
}());
