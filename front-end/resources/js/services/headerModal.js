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
        userAuthorize.credentials()
          .then(function(response) {
            if (response[0].data !== undefined) {
              strapModal.show('am-fade-and-scale', 'center', 'commons/addInvoiceFromAddress.html');
            }
            else {
              strapModal.show('am-fade-and-scale', 'center', 'commons/unauthorizedAccess.html');
            }
          });
      }

      function loginUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/login.html');
      }

      function toAddressModal() {
        userAuthorize.credentials()
          .then(function(response) {
            if (response[0].data !== undefined) {
              strapModal.show('am-fade-and-scale', 'center', 'commons/addInvoiceToAddress.html');
            }
            else {
              strapModal.show('am-fade-and-scale', 'center', 'commons/unauthorizedAccess.html');
            }
          });
      }
    }
}());
