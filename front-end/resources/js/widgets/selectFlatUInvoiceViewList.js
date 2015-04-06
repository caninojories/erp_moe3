(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('select2FlatUiInvoiceViewList', select2FlatUi);

    select2FlatUi.$inject = ['$q', '$rootScope', '$timeout', 'commonsDataService', 'invoiceServiceApi', 'strapAlert'];
    /*@ngInject*/
    function select2FlatUi($q, $rootScope, $timeout, commonsDataService, invoiceServiceApi, strapAlert) {
      var directive = {
        restrict: 'AEC',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        element.val(attrs.select2FlatUiInvoiceViewList);
        element.select2({dropdownCssClass: 'select2DropDown'});
        element.on('change', function(e) {
          var val = element.val();
          $q.all([putInvoiceListCallback(attrs.id , val)])
            .then(function(response) {
              if (response[0].number !== undefined) {
                strapAlert.show('Success!', 'Status update success ', 'success', 'alert-invoice-update-status');
                $timeout(function() {
                  strapAlert.hide();
                }, 2000);
              } else {
                strapAlert.show('Warning!', 'Status update failed ', 'warning', 'alert-invoice-update-status');
                $timeout(function() {
                  strapAlert.hide();
                }, 2000);
              }
            });
        });
      }

      function putInvoiceListCallback(id, status) {
        return commonsDataService
          .httpPUTRouteParams('status', id, {status: status}, invoiceServiceApi)
          .then(function(response) {
            return response;
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
