(function() {
  'use strict';

  angular
    .module('app.signin')
    .controller('Signin', Signin);

    Signin.$inject = ['$timeout', '$auth', 'strapAlert', 'strapModal'];

    function Signin($timeout, $auth, strapAlert, strapModal) {
      var vm = this;

      /*Functions*/
      vm.authenticate     = authenticate;
      vm.isAuthenticated  = $auth.isAuthenticated;
      vm.loginUser        = loginUser;
      vm.login            = login;

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

      function authenticate(provider) {
        $auth.authenticate(provider)
        .then(function(response) {
          //$rootScope.username = response.data.user.displayName || response.data.user.username;
          vm.isAuthenticated = $auth.isAuthenticated;
        }, function(err) {
          if (err) {throw err;}
        });
      }
    }
}());
