(function() {
    'use strict';

    angular
      .module('app.core')
      .value('config', config)
      .config(configure)
      .config(toastrConfig)
      .run(google);

    /* @ngInject */
    function toastrConfig(toastr) {
      toastr.options.timeOut = 4000;
      toastr.options.positionClass = 'toast-top-right';
    }

    var config = {
        appErrorPrefix: '[Magens Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Magens Boilerplate',
        version: '0.0.0'
    };



    /* @ngInject */
    function configure ( $locationProvider, $logProvider, $urlRouterProvider, $stateProvider,
      routehelperConfigProvider, exceptionHandlerProvider, $httpProvider, $authProvider ) {

        //exceptionConfigProvider
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        //routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';

        $locationProvider
          .html5Mode(true);

        $authProvider.loginUrl = 'http://localhost:3000/userApi/userLogIn';
        $authProvider.signupUrl = 'http://localhost:3000/userApi/userSignUp';

        $authProvider.google({
          clientId: '514855305579-vmrkir3l76c0v2t6b5mtnphh38uf9irp.apps.googleusercontent.com',
          url: 'http://localhost:3000/userApi/logInUserGoogle'
        });

        $authProvider.facebook({
          clientId: '789445017793242',
          url: 'http://localhost:3000/userApi/logInUserFacebook'
        });

        $httpProvider.interceptors.push('authInterceptor');
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }

    function google( $window ) {
      var params = $window.location.search.substring(1);
      if( params && $window.opener && $window.opener.location.origin === $window.location.origin ) {
        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);
        $window.opener.postMessage( code, $window.location.origin );
      }
    }
})();
