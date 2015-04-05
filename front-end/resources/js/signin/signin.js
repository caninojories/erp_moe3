(function() {
  'use strict';

  angular
    .module('app.signin')
    .controller('Signin', Signin);

    Signin.$inject = ['$timeout', '$rootScope', '$auth', 'strapAlert', 'strapModal'];
    /*@ngInject*/
    function Signin($timeout, $rootScope, $auth, strapAlert, strapModal) {
      var vm = this;

      /*Variable Initialization*/
      $rootScope.isAuthenticated  = $auth.isAuthenticated;
      /*Functions*/
      vm.authenticate     = authenticate;
      vm.login            = login;
      vm.logout           = logout;

      function login(isLoginFormValid) {
        if (!isLoginFormValid) {return;}

        $auth.login({
          email: vm.email,
          password: vm.password
        }).then(function(response) {
          $rootScope.isAuthenticated  = $auth.isAuthenticated;
          strapModal.hide();
        }).catch(function(error) {
          strapAlert.show('Warning: ', error.data.message, 'danger', 'alert-login');
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
        });
      }

      function authenticate(provider) {
        $auth.authenticate(provider)
          .then(function(response) {
          vm.isAuthenticated = $auth.isAuthenticated;
        }).catch(function(error) {
          /*catch error here*/
        });
      }

      function logout() {
        $auth.logout();
      }
    }
}());
