(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('typeAheadTo', typeAheadTo);

    typeAheadTo.$inject = ['$rootScope'];

    function typeAheadTo($rootScope) {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var invoiceTo = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          limit: 10,
          prefetch: {
            url: window.location.origin + '/invoiceApi/invoiceToAddress',
            filter: function(list) {
              return $.map(list, function(to) {
                return {name: to.name};
              });
            }
          }
        });

        invoiceTo.initialize();

        element.typeahead(null, {
          name: 'invoiceTo',
          displayKey: 'name',
          source: invoiceTo.ttAdapter()
        });

        element.on('typeahead:selected', function(event, datum) {
          $rootScope.companyNameTo = datum.name;
        }).on('typeahead:autocompleted', function (e, datum) {
          $rootScope.companyNameTo = datum.name;
        }).on('keydown', function(event) {
          var str = element.val();
          if (event.keyCode === 8){
            str = element.val();
            $rootScope.companyNameTo = str.slice(0, str.length-1);
          } else if (event.keyCode === 70) {
            str = element.val();
            $rootScope.companyNameTo = str.slice(0, str.length-1);
          }
        });
      }
    }
}());
