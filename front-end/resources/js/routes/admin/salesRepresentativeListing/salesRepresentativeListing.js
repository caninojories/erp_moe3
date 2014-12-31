(function() {
  'use strict';

  angular
  .module( 'app.salesRepresentativeListing' )
  .controller( 'SalesRepresentativeListing', SalesRepresentativeListing );

  SalesRepresentativeListing.$inject = [ '$q', '$filter', '$rootScope', '$state', '$timeout', 'Restangular',
    'DTOptionsBuilder', 'DTColumnBuilder', 'salesRepresentativeListingDataService' ];

  function SalesRepresentativeListing( $q, $filter, $rootScope, $state, $timeout, Restangular,
    DTOptionsBuilder, DTColumnBuilder, salesRepresentativeListingDataService ) {
    var vm = this;

    init();

    function init() {
      //getSalesRepresentativeList();
      vm.dtOptions = DTOptionsBuilder.fromSource( 'http://localhost:3000/salesRepresentativeApi/getSalesRepresentativeList' )
      //Add Bootstrap compatibility
      //.withBootstrap()
      // Overriding the classes
      // .withBootstrapOptions({
      //   TableTools: {
      //     classes: {
      //       container: 'btn-group',
      //       buttons: {
      //         normal: 'btn btn-danger'
      //       }
      //     }
      //   },
      //   // ColVis: {
      //   //   classes: {
      //   //     masterButton: 'btn btn-primary'
      //   //   }
      //   // }
      // })

      //Add ColVis compatibility
      //.withColVis()

      //Add Table tools compatibility
      .withTableTools('/js/vendor/table-tools/swf/copy_csv_xls_pdf.swf')
      .withTableToolsButtons([
        'copy',
        'print', {
          'sExtends': 'collection',
          'sButtonText': 'Save',
          'aButtons': ['csv', 'pdf'],
        }
      ]);

      vm.dtColumns = [
      DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
      .renderWith(function(data, type, full, meta) {
        return '<a href="#"><i class="ion-compose" ng-click="vm.edit(' + data._id + ')">' +
        '</i></a>&nbsp;' +
        '<a href="#"><i class="ion-backspace" ng-click="vm.delete(' + data._id + ')">' +
        '</i></a>';
      }),
      DTColumnBuilder.newColumn('firstName').withTitle('First name').notSortable(),
      DTColumnBuilder.newColumn('lastName').withTitle('Last name').notSortable(),
      DTColumnBuilder.newColumn('postalCode').withTitle('Last name').notSortable(),
      DTColumnBuilder.newColumn('salesOfficeAddress1').withTitle('Last name').notSortable(),
      DTColumnBuilder.newColumn('salesOfficeAddress2').withTitle('Last name').notSortable(),
      DTColumnBuilder.newColumn('salesOfficeAddress3').withTitle('Last name').notSortable(),
      DTColumnBuilder.newColumn('salesOfficePhoneNumber').withTitle('Last name').notSortable(),
      ];

      // $timeout(function () {
      //   $state.go('.', {}, { reload: true });
      // }, 100);
    }

    function getSalesRepresentativeList() {
      $q.all( [getSalesRepresentativeListCallBack()] )
        .then(function( response ) {
          $timeout(function () {
            $state.go('.', {}, { reload: true });
          }, 100);
          return response;
        });
    }

    function getSalesRepresentativeListCallBack() {
      return salesRepresentativeListingDataService
        .getSalesRepresentative( 'getSalesRepresentativeList', {} )
        .then(function( response ) {
          return response;
        });
    }
    // vm.salesRepresentativeList = Restangular.stripRestangular(getSalesRepresentativeList);
    //
    // $rootScope.tableParams = new ngTableParams({
    //   page: 1,            // show first page
    //   count: 10,          // count per page
    // }, {
    //   total: vm.salesRepresentativeList .length, // length of data
    //   getData: function($defer, params) {
    //     // use build-in angular filter
    //     var filteredData = params.filter() ?
    //     $filter('filter')(vm.salesRepresentativeList , params.filter()) :
    //     vm.salesRepresentativeList ;
    //     var orderedData = params.sorting() ?
    //     $filter('orderBy')(filteredData, params.orderBy()) :
    //     vm.salesRepresentativeList ;
    //
    //     params.total(orderedData.length); // set total for recalc pagination
    //     $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    //   }
    // });
  }
})();
