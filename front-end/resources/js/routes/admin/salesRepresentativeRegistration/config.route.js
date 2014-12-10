(function(){
  'use strict';

  angular
    .module('app.salesRepresentativeRegistration')
    .run(appRun);

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes(){
      return [{
        state: 'salesRepresentativeRegistration',
        config: {
          url: '/salesRepresentativeRegistration',
          templateUrl: '/admin/salesRepresentativeRegistration/index.html',
          controller: 'SalesRepresentativeRegistration as vm',
          title: 'SalesRepresentativeRegistration'
        }
      }];
    }
})();
