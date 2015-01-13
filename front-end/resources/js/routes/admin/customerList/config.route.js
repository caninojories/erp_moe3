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
            reload: function( $rootScope ) {
              $rootScope.showContent = false;
              return;
            }
          }
        }
      }, {
        state: 'editCustomerList',
        config: {
          url: '/customerList/edit/:id',
          templateUrl: '/admin/customerList/edit/index.html',
          controller: 'EditCustomerList as vm',
          title: 'EditCustomer List'
        }
      }];
    }
}());
