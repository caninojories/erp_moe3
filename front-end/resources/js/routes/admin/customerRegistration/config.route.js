(function() {
  'use strict';

  angular
  .module('app.customerRegistration')
  .run(appRun);

  appRun.$inject = ['routehelper'];
  /*ngInject*/
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      state: 'customerRegistration',
      config: {
        url: '/customerRegistration',
        templateUrl: '/admin/customerRegistration/index.html',
        controller: 'CustomerRegistration as vm',
        title: 'CustomerRegistration'
      }
    }];
  }
})();
