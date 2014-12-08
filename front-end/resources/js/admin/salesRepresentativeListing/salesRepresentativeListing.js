(function() {
  'use strict';

  angular
  .module('app.salesRepresentativeListing')
  .controller('SalesRepresentativeListing', SalesRepresentativeListing);

  SalesRepresentativeListing.$inject = ['$filter', '$q', '$rootScope','ngTableParams', 'Restangular',
    'getSalesRepresentativeList', 'salesRepresentativeListingDataService'];

  function SalesRepresentativeListing( $filter, $q, $rootScope, ngTableParams, Restangular,
    getSalesRepresentativeList, salesRepresentativeListingDataService ) {
    var vm = this;

    //vm.jories = $rootScope.salesRepresentativeData;
    vm.jories = Restangular.stripRestangular(getSalesRepresentativeList);

    console.log( vm.jories );

    $rootScope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
    }, {
      total: vm.jories.length, // length of data
      getData: function($defer, params) {
        // use build-in angular filter
        var filteredData = params.filter() ?
        $filter('filter')(vm.jories, params.filter()) :
        vm.jories;
        var orderedData = params.sorting() ?
        $filter('orderBy')(filteredData, params.orderBy()) :
        vm.jories;

        params.total(orderedData.length); // set total for recalc pagination
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  }
})();
