(function(){
  'use strict';

  angular
  .module('app.quotationRegistration')
  .controller('QuotationRegistration', QuotationRegistration);

  QuotationRegistration.$inject = [ '$q', '$scope', '$rootScope', '$timeout',
    'exception', 'quotationRegistrationDataService' ];

  function QuotationRegistration( $q, $scope, $rootScope, $timeout,
    exception, quotationRegistrationDataService ) {
    var vm  = this;
    /***
     ** String Literals
     ***/
    vm.selectedDate = new Date();

    /***
    ** Functions and Arrays
    ***/
    vm.addQuotation    = addQuotation;
    vm.afterSave       = afterSave;
    vm.cancel          = cancel;
    vm.deleteItem      = deleteItem;
    vm.openDate        = openDate;
    vm.saveQuotation   = saveQuotation;
    vm.xEditable       = xEditable;
    vm.quotationRegistrationList = [];

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
    }

    function afterSave( quotation ) {
      quotation.item.show = true;
    }

    function cancel( quotation ) {
      quotation.item.show = true;
    }

    function deleteItem( quotation ) {
      var position = vm.quotationRegistrationList.indexOf(quotation);
      vm.quotationRegistrationList.splice( position, 1 );
    }

    function openDate($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $rootScope.opened = true;
      setTimeout(function() {
        $rootScope.opened = false;
      }, 10);
    }

    function saveQuotation() {
      vm.tempQuotationList = angular.copy( vm.quotationRegistrationList );
      for(var i = 0; i < vm.quotationRegistrationList.length; i++) {
        try {
          vm.tempQuotationList[i].item.name = vm.quotationRegistrationList[i].item.name;
          vm.tempQuotationList[i].quantity  = vm.values['quantity_' + i.toString()];
          vm.tempQuotationList[i].unitPrice = vm.values['unitPrice_' + i.toString()];
          vm.tempQuotationList[i].amount    = vm.values['amount_' + i.toString()];
          vm.tempQuotationList[i].status    = vm.values['status_' + i.toString()];
          vm.tempQuotationList[i].condition = vm.values['condition_' + i.toString()];
          vm.tempQuotationList[i].remark    = vm.values['remark_' + i.toString()];
          vm.tempQuotationList[i].salesProgress    = vm.values['salesProgress_' + i.toString()];
          vm.tempQuotationList[i].SPOT             = vm.values['SPOT_' + i.toString()];
          vm.tempQuotationList[i].noteForQuotation = vm.values['noteForQuotation_' + i.toString()];
          vm.tempQuotationList[i].comment          = vm.values['comment_' + i.toString()];
          vm.tempQuotationList[i].note             = vm.values['note_' + i.toString()];
        }catch( error ){
          console.log( '**Use for error Messgaes**');
          console.log( 'Exception Module: cannot be seen until the debug is false' );
          exception.catcher( 'Exception Module: try catch solution: ' + error );
        }
      }

      return $q.all( [saveQuotationCallBack()] )
        .then(function( response ) {
          console.log( response );
          return response;
        });
    }

    function saveQuotationCallBack() {
      console.log( vm.selectedDate );
      return quotationRegistrationDataService
        .httpPOST( 'quotationRegistration', {
          date: vm.selectedDate,
          department: vm.department,
          postalCode: vm.postalCode,
          salesRepFirstName: vm.salesRepFirstName,
          salesRepLastName : vm.salesRepLastName,
          salesOfficeAddress1: vm.salesOfficeAddress1,
          salesOfficeAddress2: vm.salesOfficeAddress2,
          salesOfficeAddress3: vm.salesOfficeAddress3,
          salesOfficePhoneNumber: vm.salesOfficePhoneNumber,
          customerFirstName: vm.customerFirstName,
          customerLastName: vm.customerLastName,
          subject: vm.subject,
          quotationObj: vm.tempQuotationList
        })
        .then(function( response ) {
          return response;
        });
    }

    function xEditable( quotation ) {
      quotation.item.show = false;
    }
  }
})();
