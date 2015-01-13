(function() {
  'use strict';

  angular
    .module( 'app.quotationList' )
    .controller( 'QuotationList', QuotationList );

    QuotationList.$inject = [ '$compile', '$q', '$scope', 'DTOptionsBuilder',
      'DTColumnBuilder', 'quotationListDataService' ];

    function QuotationList( $compile, $q, $scope, DTOptionsBuilder,
      DTColumnBuilder, quotationListDataService ) {

      $scope.delete = function(id) {
        $q.all( [deleteCallBack(id)] )
        .then(function( response ) {
          $scope.dtOptions.reloadData();
          return response;
        });
      };

      function deleteCallBack( id ) {
        return quotationListDataService
        .httpDELETE( 'quotationList', {id: id} )
        .then(function( response ) {
          return response;
        });
      }

      $scope.dtOptions = DTOptionsBuilder.fromSource( 'http://localhost:3000/quotationApi/quotationList' )
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
          return '<a href="/quotationList/edit/' + data._id + '">' +
          '<button class="btn btn-xs btn-warning">' +
          '<i class="ion-compose"></i>' +
          '</button></a>&nbsp;' +
          '<button class="btn btn-xs btn-danger" ng-click="delete(\'' + (data._id.toString()) + '\')">' +
          '<i class="ion-backspace"></i>' +
          '</button>';
        }),
        DTColumnBuilder.newColumn(null).withTitle('Date').notSortable()
          .renderWith(function( data ,type, full, meta) {
            var date = moment( data.date ).format('LL');
            return date;
          }),
        DTColumnBuilder.newColumn('quotationNumber').withTitle('Number').notSortable(),
        DTColumnBuilder.newColumn('postalCode').withTitle('Postal Code').notSortable(),
        DTColumnBuilder.newColumn('salesRepFirstName').withTitle('Sale Representative First Name').notSortable(),
        DTColumnBuilder.newColumn('salesRepLastName').withTitle('Sale Representative Last Name').notSortable(),
        DTColumnBuilder.newColumn('salesOfficeAddress1').withTitle('Sales Office Address 1').notSortable(),
        DTColumnBuilder.newColumn('salesOfficeAddress2').withTitle('Sales Office Address 2').notSortable(),
        DTColumnBuilder.newColumn('salesOfficeAddress3').withTitle('Sales Office Address 3').notSortable(),
        DTColumnBuilder.newColumn('salesOfficePhoneNumber').withTitle('Sales Office Phone Number').notSortable(),
        DTColumnBuilder.newColumn('customerFirstName').withTitle('Customer First Name').notSortable(),
        DTColumnBuilder.newColumn('customerLastName').withTitle('Customer Last Name').notSortable(),
        DTColumnBuilder.newColumn('subject').withTitle('Subject').notSortable(),
        DTColumnBuilder.newColumn(null).withTitle('Item').notSortable()
          .renderWith(function(data, type, full, meta) {
            var objArray = [];
            data.item.forEach(function( obj ) {
              objArray.push( '<a href="#" class=quotationItem>' + obj.item.name + '</a>');
            });
            return objArray.join('</br>');
          }),
        ];
    }
}());
