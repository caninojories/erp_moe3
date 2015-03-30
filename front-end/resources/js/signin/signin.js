(function() {
  'use strict';

  angular
    .module('app.signin')
    .controller('Signin', Signin);

    Signin.$inject = ['$timeout', '$scope', '$auth', 'strapAlert', 'strapModal'];
    /*@ngInject*/
    function Signin($timeout, $scope, $auth, strapAlert, strapModal) {
      var vm = this;

      /*Functions*/
      vm.authenticate     = authenticate;
      vm.isAuthenticated  = $auth.isAuthenticated;
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
          strapAlert.show('Warning: ', error.data.message, 'danger', 'alert-login');
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
        });
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
