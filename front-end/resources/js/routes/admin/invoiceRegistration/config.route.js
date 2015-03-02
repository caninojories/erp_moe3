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
          templateUrl: '/admin/invoiceRegistration/index.html',
          controller: 'InvoiceRegistration as vm',
          title: 'InvoiceRegistration'
        }
      }, {
        state: 'viewOneInvoice',
        config: {
          url: '/invoice/view/:id',
          templateUrl: '/admin/invoice/viewOne.html'
        }
      }];
    }
})();
