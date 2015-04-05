(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('typeAheadFrom', typeAheadFrom);

    typeAheadFrom.$inject = ['$rootScope'];
    /* @ngInject */
    function typeAheadFrom($rootScope) {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var invoiceFrom = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          limit: 10,
          remote: {
            url: window.location.origin + '/invoiceApi/fromAddress/typeAhead?fromName=%QUERY',
            filter: function(list) {
              return $.map(list, function(from) {
                return {
                  id  : from._id,
                  name: from.name
                };
              });
            }
          }
        });

        invoiceFrom.initialize();

        element.typeahead(null, {
          name: 'invoiceFrom',
          displayKey: 'name',
          source: invoiceFrom.ttAdapter()
        });

        element.on('typeahead:selected', function(event, data) {
          $rootScope.companyNameFrom = data.name;
          $rootScope.companyIdFrom   = data.id;
        }).on('typeahead:autocompleted', function (e, datum) {
          $rootScope.companyNameFrom = datum.name;
        }).on('keydown', function(event) {
          var str = element.val();
          if (event.keyCode === 8) {
            str = element.val();
            $rootScope.companyNameFrom = str.slice(0, str.length - 1);
          } else if (event.keyCode === 70) {
            str = element.val();
            $rootScope.companyNameFrom = str.slice(0, str.length - 1);
          }
        });
      }
    }
}());
