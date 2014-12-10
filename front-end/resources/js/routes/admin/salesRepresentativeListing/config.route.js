(function() {
  'use strict';

  angular
    .module('app.salesRepresentativeListing')
    .run(appRun);

    function appRun( routehelper ) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'salesRepresentativeListing',
        config: {
          url: '/salesRepresentativeListing',
          templateUrl: '/admin/salesRepresentativeListing/index.html',
          controller: 'SalesRepresentativeListing as vm',
          title: 'SalesRepresentativeListing',
          resolve: {
            getSalesRepresentativeList: function( $q, $rootScope, Restangular, salesRepresentativeListingDataService ) {
              // $q.all( getSalesRepresentativeCallBack() )
              //   .then(function( response ) {
              //     return response;
              //   });

              //function getSalesRepresentativeCallBack() {
                return salesRepresentativeListingDataService
                  .getSalesRepresentative( 'getSalesRepresentativeList', {} )
                  .then(function( response ) {
                    return response;
                  });
              //}
            }
          }
        }
      }];
    }
})();
