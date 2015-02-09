(function() {
  'use strict';

  angular
  .module( 'app.salesRepresentativeListing' )
  .controller( 'SalesRepresentativeListing', SalesRepresentativeListing );

  SalesRepresentativeListing.$inject = [ '$q', '$compile', '$filter', '$rootScope', '$scope', '$state', '$timeout', 'Restangular',
    'DTOptionsBuilder', 'DTColumnBuilder', 'reload', 'salesRepresentativeListingDataService' ];

  function SalesRepresentativeListing( $q, $compile, $filter, $rootScope, $scope, $state, $timeout, Restangular,
    DTOptionsBuilder, DTColumnBuilder, reload, salesRepresentativeListingDataService ) {

    $scope.delete = function(id) {
      $q.all( [deleteCallBack(id)] )
      .then(function( response ) {
        $scope.dtOptions.reloadData();
        return response;
      });
    };

    function deleteCallBack( id ) {
      salesRepresentativeListingDataService
      .httpDelete( 'salesRepresentativeList', {id: id} )
      .then(function( response ) {
        return response;
      });
    }
    console.log(DTOptionsBuilder);
    $scope.dtOptions = DTOptionsBuilder.fromSource( 'http://localhost:3001/salesRepresentativeApi/getSalesRepresentativeList' )

    //console.log($scope.dtOptions);
      .withTableTools('/js/vendor/table-tools/swf/copy_csv_xls_pdf.swf')
      .withTableToolsButtons([
        'copy',
        'print', {
          'sExtends': 'collection',
          'sButtonText': 'Save',
          'aButtons': ['csv', 'pdf'],
        }
      ])
      .withOption('createdRow', function(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        });

    $scope.dtColumns = [
    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
      .renderWith(function(data, type, full, meta) {
        return '<a href="/salesRepresentativeListing/edit/' + data._id + '">' +
          '<button class="btn btn-xs btn-warning">' +
          '<i class="ion-compose"></i>' +
          '</button></a>&nbsp;' +
          '<button class="btn btn-xs btn-danger" ng-click="delete(\'' + (data._id.toString()) + '\')">' +
          '   <i class="ion-backspace"></i>' +
          '</button>';
      }),
    DTColumnBuilder.newColumn('firstName').withTitle('First name').notSortable(),
    DTColumnBuilder.newColumn('lastName').withTitle('Last name').notSortable(),
    DTColumnBuilder.newColumn('postalCode').withTitle('Postal Code').notSortable(),
    DTColumnBuilder.newColumn('salesOfficeAddress1').withTitle('Sales Office Address 1').notSortable(),
    DTColumnBuilder.newColumn('salesOfficeAddress2').withTitle('Sales Office Address 2').withOption('defaultContent', '').notSortable(),
    DTColumnBuilder.newColumn('salesOfficeAddress3').withTitle('Sales Office Address 3').withOption('defaultContent', '').notSortable(),
    DTColumnBuilder.newColumn('salesOfficePhoneNumber').withTitle('Sales Office Phone Number').notSortable(),
    ];

    function getSalesRepresentativeList() {
      $q.all( [getSalesRepresentativeListCallBack()] )
        .then(function( response ) {
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
  }
})();
