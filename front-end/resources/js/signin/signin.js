(function() {
  'use strict';

  angular
    .module('app.signin')
    .controller('Signin', Signin);

    Signin.$inject = ['$timeout', '$auth', 'strapAlert', 'strapModal'];

    function Signin($timeout, $auth, strapAlert, strapModal) {
      var vm = this;

      /*Functions*/
      vm.isAuthenticated      = $auth.isAuthenticated;
      vm.loginUser  = loginUser;
      vm.login      = login;

      function login(isLoginFormValid) {
        if (!isLoginFormValid) {return;}

        $auth.login({
          email: vm.email,
          password: vm.password
        }).then(function(response) {
          //$rootScope.username = response.data.user.username;
          strapModal.hide();
        }).catch(function(error) {
          strapAlert.show('Something, went wrong!', 'Wrong email/password', 'alert-logIn');
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
        });
      }

      function loginUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/login.html');
      }
    }
}());
