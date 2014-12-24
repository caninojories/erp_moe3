(function() {
  'use strict';

  angular
  .module( 'strapService', ['mgcrea.ngStrap'] )
    .service('$registerUserModal',function( $modal, $alert, $dropdown, $tooltip ){

      var register   = $modal({
        animation: 'am-fade-and-scale',
        placement: 'center',
        template:'/html_common/signup.html',
        show:false
      });

      this.show = function() {
        register.$promise.then(register.show);
      };

      this.hide = function() {
        register.$promise.then( register.hide) ;
      };
     })
    .service( '$alertSignUpModal', function( $alert ) {
      var alert   = $alert({
        title: 'Success!',
        content: 'Successfully, created your account',
        type: 'info',
        container: 'alertSignUp',
        show: false
      });

      this.show = function() {
        alert.$promise.then( alert.show );
      };

      this.hide = function() {
        alert.$promise.then( alert.hide );
      };
    })
    .service( '$alertLogInModal', function( $alert ) {
      var alert   = $alert({
        title: 'Something, went wrong!',
        content: 'Wrong email/password',
        type: 'info',
        container: 'alertLogIn',
        show: true
      });

      this.show = function() {
        alert.$promise.then( alert.show );
      };

      this.hide = function() {
        alert.$promise.then( alert.hide );
      };
    })
    .service( '$logInUserModal', function( $modal ) {
      var login   = $modal({
        animation: 'am-fade-and-scale',
        placement: 'center',
        template:'/html_common/login.html',
        show:false
      });

      this.show = function() {
        login.$promise.then( login.show );
      };

      this.hide = function() {
        login.$promise.then( login.hide) ;
      };
    });
}());
