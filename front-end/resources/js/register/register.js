(function() {
  'use strict';

  angular
    .module('app.register')
    .controller('Register', Register);

    Register.$inject = ['$q', '$timeout', '$auth', 'strapAlert', 'strapModal', 'commonsDataService'];

    function Register($q, $timeout, $auth, strapAlert, strapModal, commonsDataService) {
      var vm = this;
      /*Function*/
      vm.isAuthenticated      = $auth.isAuthenticated;
      vm.checkEmailInBlurred  = checkEmailInBlurred;
      vm.logout               = logout;
      vm.register             =  register;
      vm.registerUser         = registerUser;

      function checkEmailInBlurred(signupForm) {
        return $q.all([checkEmailInBlurredCallBack()])
          .then(function(response) {
            console.log(response);
            if (response[0] !== undefined) {
              signupForm.email.$setValidity('taken', false);
            }
            else {
              signupForm.email.$setValidity('taken', true);
            }

            return response;
          });
      }

      function checkEmailInBlurredCallBack() {
        console.log(vm.email);
        
        return commonsDataService
          .checkEmail('isEmailTaken', {email: vm.email})
          .then(function(response) {
            return response;
          });
      }

      function registerUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/register.html');
      }

      function register(registerFormIsValid) {
        if (registerFormIsValid !== true) {return;}
          $auth.signup({
            email: vm.email,
            password: vm.password,
            username: vm.username
          }).then(function(response) {
            //$rootScope.username = vm.username;
            strapModal.hide();
            strapAlert.show('Success!', 'Your account has been successfully created');
            $timeout(function() {
              strapAlert.hide();
            }, 2000);
          }).catch(function(response) {
            console.log(response);
          });
      }

      function logout() {
        $auth.logout();
      }
    }
}());
