(function() {
  'use strict';

  angular
  .module( 'app.salesRepresentativeListing' )
  .controller( 'SalesRepresentativeListing', SalesRepresentativeListing );

  SalesRepresentativeListing.$inject = [ '$filter', '$rootScope','ngTableParams', 'Restangular',
    'getSalesRepresentativeList'];

  function SalesRepresentativeListing( $filter, $rootScope, ngTableParams, Restangular,
    getSalesRepresentativeList ) {
    var vm = this;

    vm.salesRepresentativeList = Restangular.stripRestangular(getSalesRepresentativeList);

    $rootScope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
    }, {
      total: vm.salesRepresentativeList .length, // length of data
      getData: function($defer, params) {
        // use build-in angular filter
        var filteredData = params.filter() ?
        $filter('filter')(vm.salesRepresentativeList , params.filter()) :
        vm.salesRepresentativeList ;
        var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        vm.salesRepresentativeList ;

        params.total(orderedData.length); // set total for recalc pagination
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  }
})();
