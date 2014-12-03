(function(){
  'use strict';

  angular
  .module('app.quotationRegistration')
  .controller('QuotationRegistration', QuotationRegistration);

  QuotationRegistration.$inject = ['$rootScope', '$timeout', 'exception'];

  function QuotationRegistration( $rootScope, $timeout, exception ) {
    var vm  = this;

    vm.openDate        = openDate;
    vm.addQuotation    = addQuotation;
    vm.saveQuotation   = saveQuotation;
    vm.dynamicModel = dynamicModel;

    vm.quotationList = [{
      item: vm.item,
      quantity: vm.quantity,
      unitPrice: vm.unitPrice,
      amount: vm.amount,
      noteForQuotation: vm.noteForQuotation
    }];

    function openDate($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $rootScope.opened = true;
      setTimeout(function() {
        $rootScope.opened = false;
      }, 10);
    }

    function addQuotation() {
      vm.quotationList.push({
        item: '',
        quantity: vm.quantity,
        unitPrice: vm.unitPrice,
        amount: vm.amount,
        noteForQuotation: vm.noteForQuotation
      });
      console.log( vm.quotationList );
    }

    function saveQuotation() {
      vm.tempQuotationList = angular.copy(vm.quotationList);
      for(var i = 0; i < vm.quotationList.length; i++) {
        try {
          vm.tempQuotationList[i].item = vm.values['item_' + i.toString()];
          vm.tempQuotationList[i].quantity = vm.values['quantity_' + i.toString()];
          vm.tempQuotationList[i].unitPrice = vm.values['unitPrice_' + i.toString()];
          vm.tempQuotationList[i].amount    = vm.values['amount_' + i.toString()];
          vm.tempQuotationList[i].notForQuotation = vm.values['noteForQuotation_' + i.toString()];
        }catch( error ){
          console.log( '**Use for error Messgaes**');
          console.log( 'Exception Module: cannot be seen until the debug is false' );
          exception.catcher( 'Exception Module: try catch solution: ' + error );
        }
      }
      console.log( vm.tempQuotationList );
    }

    function dynamicModel( model ) {
      console.log( model );
    }
  }
})();
