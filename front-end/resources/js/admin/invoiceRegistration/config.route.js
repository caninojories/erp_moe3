(function() {
  'use strict';

  angular
    .module('app.invoiceRegistration')
    .run(appRun);

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'invoiceRegistration',
        config: {
          url: '/invoiceRegistration',
          templateUrl: '/adminPanel/invoiceRegistration/index.html',
          controller: 'InvoiceRegistration as vm',
          title: 'InvoiceRegistration'
        }
      }];
    }
})();
