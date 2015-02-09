(function() {
  'use strict';

  angular
    .module( 'app.invoiceList' )
    .run( appRun );

    function appRun( routehelper ) {
      routehelper.configureRoutes( getRoutes() );
    }

    function getRoutes() {
      return [{
        state: 'invoiceList',
        config: {
          url: '/invoiceList',
          templateUrl: '/admin/invoiceList/index.html',
          controller: 'InvoiceList as vm',
          title: 'Invoice List'
        }
      }, {
        state: 'editInvoice',
        config: {
          url: '/invoice/edit/:id',
          templateUrl: '/admin/invoiceList/edit/index.html',
          controller: 'EditInvoiceList as vm',
          title: 'Edit Invoice List'
        }
      }];
    }
}());
