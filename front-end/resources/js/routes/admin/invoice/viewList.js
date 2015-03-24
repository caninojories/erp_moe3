(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('ViewList', ViewList);

    ViewList.$inject = ['$compile', '$q', '$rootScope', '$scope', '$timeout', '$window', 'DTInstances',
    'DTOptionsBuilder', 'DTColumnBuilder', 'commonsDataService', 'invoiceServiceApi', 'strapAlert', 'strapModal'];

    function ViewList($compile, $q, $rootScope, $scope, $timeout, $window, DTInstances,
    DTOptionsBuilder, DTColumnBuilder, commonsDataService, invoiceServiceApi, strapAlert, strapModal) {
      var vm = this;

      /*Initializaton*/
      vm.id = null;

      $scope.downloadPdf = function(id, number) {
        return $q.all([downloadPdfCallback(id, number)])
          .then(function(response) {
            console.log(response);
            if(response[0].data !== undefined) {
              strapAlert.show('Success!', 'Invoice #' + number + ' is successfully downloaded', 'success', 'alert-invoice-pdf-download');
              $timeout(function() {
                strapAlert.hide();
              }, 3000);
            }
          });
      };

      function downloadPdfCallback(id, number) {
        return commonsDataService
          .httpGETQueryParams('download/pdf', {
            id: id,
            number: number
          }, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      $scope.delete = function(id) {
        vm.id = id;
        console.log(id);
        strapModal.show('am-fade-and-scale', 'center', 'commons/confirmDelete.html');
      };

      $rootScope.deleteData = function(data) {
        if(data === true) {
          console.log(data);
          return $q.all([deleteCallBack()])
            .then(function(response) {
              $timeout(function() {
                vm.dtInstance.reloadData();
              }, 200);
              return response;
            });
        }
      };

      function deleteCallBack(data) {
        return commonsDataService
          .httpDELETEQueryParams('', {id:vm.id}, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }

      $scope.dtOptions = DTOptionsBuilder.fromSource($window.location.origin + '/invoiceApi/view/list')
      .withBootstrap()
      .withBootstrapOptions({
        pagination: {
          classes: {
            ul: 'pagination-plain'
          }
         }
       })
      .withTableTools('/js/vendor/table-tools/swf/copy_csv_xls_pdf.swf')
      .withTableToolsButtons([
        // 'copy',
        // 'print', {
        //   'sExtends': 'collection',
        //   'sButtonText': 'Save',
        //   'aButtons': ['csv', 'pdf'],
        // }
        ])
        .withOption('createdRow', function(row, data, dataIndex) {
          // Recompiling so we can bind Angular directive to the DT
          $compile(angular.element(row).contents())($scope);
        });

        $scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
          .renderWith(function(data, type, full, meta) {
            return '<a href="" class="top-margin">' +
            '<button class="btn btn-xs btn-success" ng-click="downloadPdf(\'' + data._id + '\',\'' + data.number + '\')">' +
            '<i class="ion-android-download"></i>' +
            '</button></a>&nbsp;' +
            '<a href="/invoice/view/' + data._id + '"' + ' class="top-margin">' +
            '<button class="btn btn-xs btn-info">' +
            '<i class="ion-eye"></i>' +
            '</button></a>&nbsp;' +
            '<a href="/invoice/edit/' + data._id + '"' + ' class="top-margin">' +
            '<button class="btn btn-xs btn-warning">' +
            '<i class="ion-compose"></i>' +
            '</button></a>&nbsp;' +
            '<button class="btn btn-xs btn-danger top-margin" ng-click="delete(\'' + (data._id.toString()) + '\')">' +
            '<i class="ion-backspace"></i>' +
            '</button>' +
            '<select data-toggle="select" class="form-control select select-primary select-xs"' + ' data-id="' + data._id.toString() + '"' +
             'select2-flat-ui-invoice-view-list="' + data.status + '">' +
              '<option value="Approved">Approved</option>' +
              '<option value="Pending">Pending</option>' +
            '</select>';
          }),

          // '<select data-toggle="select" class="form-control select select-primary select-xs" select2-flat-ui>' +
          //   '<option value="Yen">Yen (&yen;)</option>' +
          //   '<option value="Dollar">Dollar ($)</option>' +
          // '</select>';
        DTColumnBuilder.newColumn('number').withTitle('#').notSortable(),
        DTColumnBuilder.newColumn(null).withTitle('Date').notSortable()
          .renderWith(function(data, type, full, meta) {
            var date = moment(data.date).format('LL');
            return date;
          }),
        DTColumnBuilder.newColumn('terms').withTitle('Terms').notSortable(),
        DTColumnBuilder.newColumn(null).withTitle('Due Date').notSortable()
          .renderWith(function(data, type, full, meta) {
            var date = moment(data.dueDate).format('LL');
            return date;
          }),
        // DTColumnBuilder.newColumn(null).withTitle('Item').notSortable()
        //   .renderWith(function(data, type, full, meta) {
        //     var objArray = [];
        //     data.item.forEach(function(obj) {
        //       objArray.push('<a href="#" class=quotationItem>' + obj.name + '</a>');
        //     });
        //     return objArray.join('</br>');
        //   }),
        ];

      return DTInstances.getLast().then(function (dtInstance) {
        vm.dtInstance = dtInstance;
      });
    }
}());
