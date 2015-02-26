(function() {
  'use strict';

  angular
    .module('app.salesRepresentativeListing')
    .run(appRun);

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'salesRepresentativeListing',
        config: {
          url: '/salesRepresentativeListing',
          templateUrl: '/admin/salesRepresentativeListing/index.html',
          controller: 'SalesRepresentativeListing as vm',
          title: 'SalesRepresentativeListing',
          resolve: {
            reload: function($rootScope) {
              $rootScope.showContent = false;
              return;
            }
          }
        },
      }, {
        state: 'editSalesRepresentativeListing',
        config: {
          url: '/salesRepresentativeListing/edit/:id',
          templateUrl: '/admin/salesRepresentativeListing/edit/index.html',
          controller: 'EditSalesRepresentativeListing as vm',
          title: 'EditSalesRepresentativeListing'
        }
      }];
    }
})();
