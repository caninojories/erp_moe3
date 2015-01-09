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
          title: 'Quotation List'
        }
      }, {
        state: 'editQuotationList',
        config: {
          url: '/quotationList/edit/:id',
          templateUrl: '/admin/quotationList/edit/index.html',
          controller: 'EditQuotationList as vm',
          title: 'EditQuotation List'
        }
      }];
    }
}());
