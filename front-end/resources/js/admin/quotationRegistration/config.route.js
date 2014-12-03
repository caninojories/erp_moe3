(function(){
  'use strict';

  angular
  .module('app.quotationRegistration')
  .run(appRun);

  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      state: 'quotationRegistration',
      config: {
        url: '/quotationRegistration',
        templateUrl: '/adminPanel/quotationRegistration/index.html',
        controller: 'QuotationRegistration as vm',
        title: 'QuotationRegistration'
      }
    }];
  }

})();
