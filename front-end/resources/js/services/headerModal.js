(function() {
  'use strict';

  angular
    .module('app.services')
    .controller('HeaderModal', HeaderModal);

    HeaderModal.$inject = ['strapModal'];
    /*@ngInject*/
    function HeaderModal(strapModal) {
      var vm = this;

      vm.loginUser = loginUser;

      function loginUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/login.html');
      }
    }
}());
