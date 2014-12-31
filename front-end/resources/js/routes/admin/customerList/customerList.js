(function(){
  'use strict';

  angular
    .module( 'app.customerList' )
    .controller( 'CustomerList', CustomerList );

    CustomerList.$inject = [ '$filter', '$q', '$rootScope',
    'Restangular', 'customerDataService', 'getCustomerList'];

    function CustomerList( $filter, $q, $rootScope,
      Restangular, customerDataService, getCustomerList ) {
      var vm = this;

      // vm.customerList   = Restangular.stripRestangular(getCustomerList);
      // vm.deleteCustomer = deleteCustomer;
      //
      // $rootScope.tableParams = new ngTableParams({
      //   page: 1,            // show first page
      //   count: 10,          // count per page
      // }, {
      //   total: vm.customerList .length, // length of data
      //   getData: function($defer, params) {
      //     // use build-in angular filter
      //     var filteredData = params.filter() ?
      //     $filter('filter')(vm.customerList , params.filter()) :
      //     vm.customerList ;
      //     var orderedData = params.sorting() ?
      //     $filter('orderBy')(filteredData, params.orderBy()) :
      //     vm.customerList ;
      //
      //     params.total(orderedData.length); // set total for recalc pagination
      //     $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      //   }
      // });
      //
      // function deleteCustomer( customer ) {
      //   return $q.all( deleteCustomerCallBack( customer ) )
      //     .then(function( response ) {
      //       spliceCustomerList( customer );
      //       return response;
      //     });
      // }
      //
      // function deleteCustomerCallBack( customer ) {
      //   return customerDataService
      //     .deleteCustomer( 'deleteCustomer', {id: customer._id} )
      //     .then(function( response ) {
      //       return response;
      //     });
      // }
      //
      // function spliceCustomerList( customer ) {
      //   console.log( vm.customerList.indexOf(customer));
      //   console.log( customer );
      //   vm.customerList.splice( vm.customerList.indexOf(customer), 1 );
      //   $rootScope.tableParams.reload();
      // }
    }
}());
