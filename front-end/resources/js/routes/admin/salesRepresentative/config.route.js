(function() {
  'use strict';

  angular
    .module('app.salesRepresentative')
    .run(appRun);

    appRun.$inject = ['routehelper'];
    /*ngInject*/
    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'salesRepresentativeRegistration',
        config: {
          url: '/salesRepresentative/registration',
          templateUrl: '/admin/salesRepresentative/registration.html',
          controller: 'SalesRepresentativeRegistration as vm',
          title: 'SalesRepresentativeRegistration'
        }
      }];
    }
})();
