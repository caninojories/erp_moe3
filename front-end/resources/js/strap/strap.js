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

      console.log( $auth.isAuthenticated() );

      vm.registerUserStrap = registerUserStrap;
      vm.logInUserStrap    = logInUserStrap;
      vm.blurred           = blurred;
      vm.signup            = signup;
      vm.login             = login;
      vm.logout            = logout;
      vm.authenticate      = authenticate;

      vm.clientId = '514855305579-vmrkir3l76c0v2t6b5mtnphh38uf9irp.apps.googleusercontent.com';

      function registerUserStrap() {
        $registerUserModal.show();
      }

      function blurred( signupForm ) {
        return $q.all( [blurredCallBack()] )
          .then(function( response ) {
            if( response[0] !== undefined ) {
              signupForm.email.$setValidity( 'taken', false );
            } else {
              signupForm.email.$setValidity( 'taken', true );
            }
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
        if( signupForm_isValid !== true) {
          console.log( 'invalid form' );
          return;
        }

        console.log( $auth );
        $auth.signup({
          email: vm.email,
          password: vm.password
        }).then(function( response ) {
          console.log( response );
          $registerUserModal.hide();
          $alertSignUpModal.show();
          $timeout(function() {
            $alertSignUpModal.hide();
          }, 2000);
        }).catch(function( err ) {
          console.log( err );
        });
        // return $q.all( [registerCallBack()] )
        //   .then(function( response ) {
        //     $registerUserModal.hide();
        //     $alertSignUpModal.show();
        //     $timeout(function() {
        //       $alertSignUpModal.hide();
        //     }, 2000);
        //     console.log( response[0].token );
        //     authToken.setToken( response[0].token );
        //     return response;
        //   });
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

        console.log( $auth );
        $auth.login({
          email: vm.email,
          password: vm.password
        }).then(function( response ) {
          console.log( response );
          $logInUserModal.hide();
        }).catch(function( err ) {
          console.log( err );
        });
        // return $q.all( [loginCallBack()] )
        //   .then(function( response ) {
        //     if( response[0] === undefined ) {
        //       $alertLogInModal.show();
        //       $timeout(function() {
        //         $alertLogInModal.hide();
        //       }, 2000);
        //       return;
        //     }
        //     $logInUserModal.hide();
        //     authToken.setToken( response[0].token );
        //     return response;
        //   });
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
        // authToken.removeToken();
        $auth.logout();
        $state.go( 'primary' );
      }

      function logInUserStrap() {
        $logInUserModal.show();
      }

      function authenticate( provider ) {
        $auth.authenticate( provider )
          .then(function( response ) {
            console.log( response );
            vm.isAuthenticated = $auth.isAuthenticated;
            //authToken.setToken( response.data.token );
          }, function( err ) {
            console.log( err );
          });
        // var url     = 'https://accounts.google.com/o/oauth2/auth?' + urlBuilderForGoogle().join('&'),
        //     options = 'width=500, height=500, left=' + ($window.outerWidth - 500) / 2 + ', top=' + ($window.outerHeight - 500) / 2.5;
        // var popUpWindow = $window.open( url, '', options );
        // $window.focus();
        //
        // $window.addEventListener('message', function( event ) {
        //    if( event.origin === $window.location.origin ) {
        //     popUpWindow.close();
        //
        //     return $q.all( [logInUserGoogleCallBack( event.data )] )
        //       .then(function( response ) {
        //         authToken.setToken( response[0].token );
        //         return response;
        //       });
        //    }
        // });
      }

      function logInUserGoogleCallBack( code ) {
        return commonsDataService
          .googleAuth( 'logInUserGoogle', {
            code: code,
            clientId: vm.clientId,
            redirectUri: $window.location.origin
          })
          .then(function( response ) {
            console.log( response );
            return response;
          });
      }

      function urlBuilderForGoogle() {
        var urlBuilder = [];

        urlBuilder.push('response_type=code',
                        'client_id=' + vm.clientId,
                        'redirect_uri=' + window.location.origin,
                        'scope=profile email');

        return urlBuilder;
      }
    }
}());
