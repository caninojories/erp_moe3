(function() {
  'use strict';

  angular
    .module('app.customerList')
    .run(appRun);

    function appRun( routehelper ) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'customerList',
        config: {
          url: '/customerList',
          templateUrl: '/admin/customerList/index.html',
          controller: 'CustomerList as vm',
          title: 'Customer List',
          resolve: {
            getCustomerList: function( customerDataService ) {
              return customerDataService
                .getCustomer( 'getCustomerList', {} )
                .then(function( response ) {
                  return response;
                });
            }
          }
        }
      }];
    }
}());
