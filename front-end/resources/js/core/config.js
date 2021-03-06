(function() {
    'use strict';

    var config = {
        appErrorPrefix: '[Magens Error] ',
        appTitle: 'Magens Boilerplate',
        version: '0.0.0'
    };

    angular
      .module('app.core')
      .value('config', config)
      .config(configure)
      .config(toastrConfig)
      .config(loginConfig)
      .run(google);

    toastrConfig.$inject = ['toastr'];
    /*ngInject*/
    function toastrConfig(toastr) {
      toastr.options.timeOut = 4000;
      toastr.options.positionClass = 'toast-top-right';
    }

    loginConfig.$inject = ['$authProvider', 'cfpLoadingBarProvider'];
    /*@ngInject*/
    function loginConfig($authProvider, cfpLoadingBarProvider) {
      cfpLoadingBarProvider.latencyThreshold = 100;
      $authProvider.loginUrl = window.location.origin + '/userApi/userLogIn';
      $authProvider.signupUrl = window.location.origin + '/userApi/userRegister';
      $authProvider.tokenPrefix = 'erp_moe3';

      $authProvider.google({
        clientId: '514855305579-vmrkir3l76c0v2t6b5mtnphh38uf9irp.apps.googleusercontent.com',
        url: window.location.origin + '/userApi/logInUserGoogle'
      });

      $authProvider.facebook({
        clientId: '789445017793242',
        url: window.location.origin + '/userApi/logInUserFacebook'
      });
    }

    configure.$inject = ['$httpProvider', '$locationProvider', '$logProvider', '$urlRouterProvider', '$stateProvider',
    'RestangularProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider', '$authProvider'];
    /*@ngInject*/
    function configure ($httpProvider, $locationProvider, $logProvider, $urlRouterProvider, $stateProvider,
      RestangularProvider, routehelperConfigProvider, exceptionHandlerProvider, $authProvider) {

      $locationProvider.html5Mode(true);
      if ($logProvider.debugEnabled) {$logProvider.debugEnabled(true);}

      routehelperConfigProvider.config.$stateProvider = $stateProvider;
      routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
      routehelperConfigProvider.config.docTitle = 'NG-Modular: ';

      $httpProvider.interceptors.push('authInterceptor');
      $httpProvider.interceptors.push('languageInterceptor');
      exceptionHandlerProvider.configure(config.appErrorPrefix);
    }

    google.$inject = ['$window'];
    /*ngInject*/
    function google($window) {
      var params = $window.location.search.substring(1);
      if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);
        $window.opener.postMessage(code, $window.location.origin);
      }
    }
})();
