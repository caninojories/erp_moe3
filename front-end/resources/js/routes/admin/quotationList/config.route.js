(function() {
  'use strict';

  angular
    .module( 'app.quotationList' )
    .run( appRun );

    function appRun( routehelper ) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'quotationList',
        config: {
          url: '/quotationList',
          templateUrl: '/admin/quotationList/index.html',
          controller: 'QuotationList as vm',
          title: 'QuotationList'
        }
      }];
    }
}());
