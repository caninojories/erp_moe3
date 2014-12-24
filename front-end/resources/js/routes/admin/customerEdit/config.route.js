(function() {
  'use strict';

  angular
    .module( 'app.customerEdit' )
    .run( appRun );

    function appRun( routehelper ) {
      routehelper.configureRoutes( getRoutes() );
    }

    function getRoutes() {
      return [{
        state: 'customerEdit',
        config: {
          url: '/customerList/edit/:id',
          templateUrl: '/admin/customerEdit/index.html',
          controller: 'CustomerEdit as vm',
          title: 'Customer Edit',
          resolve: {
            getCustomerInfo: function( $stateParams, customerEditDataService ) {
              return customerEditDataService
                .getCustomerInfo( 'customerInformation', {id: $stateParams.id} )
                .then(function( response ) {
                  return response;
                });
            }
          }
        }
      }];
    }
}());
