(function() {
  'use strict';

  angular
    .module('app.quotationRegistration')
    .run(appRun);

  appRun.$inject = ['routehelper'];
  /*ngInject*/
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      state: 'quotationRegistration',
      config: {
        url: '/quotationRegistration',
        templateUrl: '/admin/quotationRegistration/index.html',
        controller: 'QuotationRegistration as vm',
        title: 'QuotationRegistration'
      }
    }];
  }

})();
