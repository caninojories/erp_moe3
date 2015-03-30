(function() {
  'use strict';

  angular
    .module('app.services')
    .controller('HeaderModal', HeaderModal);

    HeaderModal.$inject = ['$rootScope', '$auth', 'strapModal', 'userAuthorize'];
    /*@ngInject*/
    function HeaderModal($rootScope, $auth, strapModal, userAuthorize) {
      var vm = this;

      vm.fromAddressModal = fromAddressModal;
      vm.loginUser        = loginUser;
      vm.toAddressModal   = toAddressModal;

      function fromAddressModal() {
        console.log(userAuthorize.credentials());
        strapModal.show('am-fade-and-scale', 'center', 'commons/addInvoiceFromAddress.html');
      }

      function loginUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/login.html');
      }

      function toAddressModal() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/addInvoiceToAddress.html');
      }
    }
}());
