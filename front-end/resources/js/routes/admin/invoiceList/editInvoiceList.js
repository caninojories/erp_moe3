(function() {
  'use strict';

  angular
  .module( 'app.invoiceList' )
  .controller( 'EditInvoiceList', EditInvoiceList );

  EditInvoiceList.$inject = [ '$q', '$state', 'Restangular', 'invoiceListDataService' ];

  function EditInvoiceList( $q, $state, Restangular, invoiceListDataService ) {
    var vm = this;

    vm.addInvoice       = addInvoice;
    vm.updateOneInvoice = updateOneInvoice;
    vm.invoiceList      = [];

    getOneInvoice();

    function getOneInvoice() {
      return $q.all( [getOneInvoiceCallBack()] )
      .then(function( response ) {
        vm.invoiceObj = Restangular.stripRestangular(response[0]);
        vm.selectedDate             = vm.invoiceObj.date;
        vm.invoiceNumber            = vm.invoiceObj.invoiceNumber;
        vm.postalCode               = vm.invoiceObj.postalCode;
        vm.customerFirstName        = vm.invoiceObj.customerFirstName;
        vm.customerLastName         = vm.invoiceObj.customerLastName;
        vm.subject                  = vm.invoiceObj.subject;
        vm.salesRepFirstName        = vm.invoiceObj.salesRepFirstName;
        vm.salesRepLastName         = vm.invoiceObj.salesRepLastName;
        vm.salesOfficeAddress1      = vm.invoiceObj.salesOfficeAddress1;
        vm.salesOfficeAddress2      = vm.invoiceObj.salesOfficeAddress2;
        vm.salesOfficeAddress3      = vm.invoiceObj.salesOfficeAddress3;
        vm.salesOfficePhoneNumber   = vm.invoiceObj.salesOfficePhoneNumber;
        vm.invoiceList              = vm.invoiceObj.item;
        return response;
      });
    }

    function getOneInvoiceCallBack() {
      return invoiceListDataService
        .httpGET( 'editInvoiceList', {id: $state.params.id} )
        .then(function( response ) {
          return response;
        });
    }

    function updateOneInvoice() {
      return $q.all( [updateOneInvoiceCallBack()] )
        .then(function( response ) {
          return response;
        });
    }

    function updateOneInvoiceCallBack() {
      return invoiceListDataService
        .httpPUT( 'editInvoiceList', {
          id: $state.params.id,
          date: vm.selectedDate,
          invoiceNumber: vm.invoiceNumber,
          postalCode: vm.postalCode,
          customerFirstName: vm.customerFirstName,
          customerLastName: vm.customerLastName,
          subject: vm.subject,
          salesRepFirstName: vm.salesRepFirstName,
          salesRepLastName: vm.salesRepLastName,
          salesOfficeAddress1: vm.salesOfficeAddress1,
          salesOfficeAddress2: vm.salesOfficeAddress2,
          salesOfficeAddress3: vm.salesOfficeAddress3,
          salesOfficePhoneNumber: vm.salesOfficePhoneNumber,
          item: vm.invoiceList
        })
        .then(function( response ) {
          return response;
        });
    }
    // function updateInvoice( key, value, index ){
    //   return $q.all( [updateInvoiceCallBack( key, value, index )] )
    //   .then(function( response ) {
    //     return response;
    //   });
    // }
    //
    // function updateInvoiceItem( key  ){
    //   var data = [];
    //   data.push( vm.quotationObj.item );
    //   return $q.all( [updateInvoiceCallBack( key, data )] )
    //   .then(function( response ) {
    //     return response;
    //   });
    // }
    //
    // function updateInvoiceCallBack( key, value  ) {
    //   var tempValue = angular.copy(value);
    //   return invoiceListDataService
    //   .httpPUT( 'editQuotationList', {
    //     id:$state.params.id,
    //     key: key,
    //     value: value
    //   })
    //   .then(function( response ) {
    //     return response;
    //   });
    // }

    function addInvoice() {
      vm.invoiceList.push({
        name: vm.itemTitle || 'item',
        quantity: vm.quantity,
        unitPrice: vm.unitPrice ,
        amount: vm.amount,
        status: vm.status,
        deliveryDate: vm.deliveryDate,
        dateOfPayment: vm.dateOfPayment,
        deliveryMethod: vm.deliveryMethod,
        noteForInvoice: vm.noteForInvoice,
        accountantComment: vm.accountantComment,
        accountantNote: vm.accountantNote,
        show: true
      });

      vm.itemTitle = '';
    }
  }
}());
