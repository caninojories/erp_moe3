(function() {
  'use strict';

  angular
    .module( 'app.strap' )
    .controller( 'Strap', Strap );

    Strap.$inject = [ '$auth', '$alertLogInModal', '$alertSignUpModal', '$registerUserModal', '$logInUserModal', '$modal', '$q',
      '$scope', '$state', '$timeout', '$window', 'authToken', 'commonsDataService' ];

    function Strap( $auth, $alertLogInModal, $alertSignUpModal, $registerUserModal, $logInUserModal, $modal, $q,
      $scope, $state, $timeout, $window, authToken, commonsDataService ) {
      var vm = this;

      vm.isAuthenticated = $auth.isAuthenticated;

      vm.registerUserStrap = registerUserStrap;
      vm.logInUserStrap    = logInUserStrap;
      vm.blurred           = blurred;
      vm.signup            = signup;
      vm.login             = login;
      vm.logout            = logout;
      vm.authenticate      = authenticate;

      function registerUserStrap() {
        $registerUserModal.show();
      }

      function blurred( signupForm ) {
        return $q.all( [blurredCallBack()] )
          .then(function( response ) {
            if( response[0] !== undefined ) signupForm.email.$setValidity( 'taken', false );
            else signupForm.email.$setValidity( 'taken', true );

            return response;
          });
      }

      function blurredCallBack() {
        return commonsDataService
          .checkEmail( 'isEmailTaken', {email: vm.email} )
          .then(function( response ) {
            return response;
          });
      }

      function signup( signupForm_isValid ) {
        if( signupForm_isValid !== true) return;

        $auth.signup({
          email: vm.email,
          password: vm.password
        }).then(function( response ) {
          $registerUserModal.hide();
          $alertSignUpModal.show();
          $timeout(function() {
            $alertSignUpModal.hide();
          }, 2000);
        });
      }

      function registerCallBack() {
        return commonsDataService
          .signup( 'userSignUp', {
            email: vm.email,
            username: vm.username,
            password: vm.password
          })
          .then(function( response ) {
            return response;
          });
      }

      function login( isLoginFormValid ) {
        if( !isLoginFormValid ) return;

        $auth.login({
          email: vm.email,
          password: vm.password
        }).then(function( response ) {
          $logInUserModal.hide();
        }).catch(function( error ) {
          $alertLogInModal.show();
          $timeout(function() {
            $alertLogInModal.hide();
          }, 2000 );
        });
      }

      function loginCallBack() {
        return commonsDataService
          .login( 'userLogIn', {
            email: vm.email,
            password: vm.password
          })
          .then(function( response ) {
            return response;
          });
      }

      function logout() {
        $auth.logout();
        $state.go( 'primary' );
      }

      function logInUserStrap() {
        $logInUserModal.show();
      }

      function authenticate( provider ) {
        $auth.authenticate( provider )
          .then(function( response ) {
            vm.isAuthenticated = $auth.isAuthenticated;
          }, function( err ) {
            if( err ) throw err;
          });
      }
    }
}());
