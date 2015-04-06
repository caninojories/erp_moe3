(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('select2FlatUi', select2FlatUi);

    select2FlatUi.$inject = ['$rootScope'];
    /*@ngInject*/
    function select2FlatUi($rootScope) {
      var directive = {
        restrict: 'AEC',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        currencySymbol(element.val());
        scope.$on('currency', function(event, data) {
          switch (data.toString()) {
            case '$ ':
              element.select2('val', 'Dollar');
              break;
            case '¥ ':
              element.select2('val', 'Yen');
              console.log('yen');
              break;
          }
        });
        element.select2({dropdownCssClass: 'select2DropDownInvoiceRegistration'});
        element.on('change', function(e) {
          currencySymbol(e.val);
          scope.$broadcast('select2');
        });
      }

      function currencySymbol(currency) {
        switch (currency) {
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
