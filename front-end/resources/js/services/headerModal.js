(function() {
  'use strict';

  angular
    .module('app.services')
    .controller('HeaderModal', HeaderModal);

    HeaderModal.$inject = ['$rootScope', '$auth', 'strapModal'];
    /*@ngInject*/
    function HeaderModal($rootScope, $auth, strapModal) {
      var vm = this;
      // $rootScope.isAuthenticated  = $auth.isAuthenticated;
      vm.loginUser = loginUser;

      function loginUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/login.html');
      }
    }
}());
