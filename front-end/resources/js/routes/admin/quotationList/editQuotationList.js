(function() {
  'use strict';

  angular
    .module('app.quotationList')
    .controller('EditQuotationList', EditQuotationList);

    EditQuotationList.$inject = ['$q', '$state', 'Restangular', 'quotationListDataService'];
    /*@ngInject*/
    function EditQuotationList($q, $state, Restangular, quotationListDataService) {
      var vm = this;

      vm.showSave = false;

      vm.updateQuotation      = updateQuotation;
      vm.updateQuotationItem  = updateQuotationItem;
      vm.addQuotation         = addQuotation;

      getOneQuotation();

      function getOneQuotation() {
        return $q.all([getOneQuotationCallBack()])
          .then(function(response) {
            vm.quotationObj = Restangular.stripRestangular(response[0]);
            vm.selectedDate              = vm.quotationObj.date;
            vm.quotationNumber           = vm.quotationObj.quotationNumber;
            vm.postalCode                = vm.quotationObj.postalCode;
            vm.salesRepFirstName         = vm.quotationObj.salesRepFirstName;
            vm.salesRepLastName          = vm.quotationObj.salesRepLastName;
            vm.salesOfficeAddress1       = vm.quotationObj.salesOfficeAddress1;
            vm.salesOfficeAddress2       = vm.quotationObj.salesOfficeAddress2;
            vm.salesOfficeAddress3       = vm.quotationObj.salesOfficeAddress3;
            vm.salesOfficePhoneNumber    = vm.quotationObj.salesOfficePhoneNumber;
            vm.customerFirstName         = vm.quotationObj.customerFirstName;
            vm.customerLastName          = vm.quotationObj.customerLastName;
            vm.subject                   = vm.quotationObj.subject;
            vm.quotationRegistrationList = vm.quotationObj.item;
            return response;
          });
      }

      function getOneQuotationCallBack() {
        return quotationListDataService
          .httpGET('editQuotationList', {id: $state.params.id})
          .then(function(response) {
            return response;
          });
      }

      function updateQuotation(key, value, index) {
        return $q.all([updateQuotationCallBack(key, value, index)])
          .then(function(response) {
            return response;
          });
      }

      function updateQuotationItem(key) {
        var data = [];
        data.push(vm.quotationObj.item);
        return $q.all([updateQuotationCallBack(key, data)])
        .then(function(response) {
          return response;
        });
      }

      function updateQuotationCallBack(key, value) {
        var tempValue = angular.copy(value);
        return quotationListDataService
          .httpPUT('editQuotationList', {
            id:$state.params.id,
            key: key,
            value: value
          })
          .then(function(response) {
            return response;
          });
      }

      function addQuotation() {
        vm.quotationRegistrationList.push({
          item: {
            name: vm.itemTitle || 'item',
            show: true
          },
          quantity: vm.quantity,
          unitPrice: vm.unitPrice,
          amount: vm.amount,
          status: vm.status,
          condition: vm.condition,
          remark: vm.remark,
          salesProgress: vm.salesProgress,
          SPOT: vm.SPOT,
          noteForQuotation: vm.noteForQuotation,
          comment: vm.comment,
          note: vm.note

        });

        vm.itemTitle = '';
        vm.showSave  = true;
      }
    }
}());
