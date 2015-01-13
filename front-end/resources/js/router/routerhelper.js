(function() {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routehelperConfig', routehelperConfig)
    .factory('routehelper', routehelper);

  routehelper.$inject = ['$location', '$rootScope', '$q', '$state', '$timeout', '$window',
    'logger', 'routehelperConfig'];

  // Must configure via the routehelperConfigProvider
  function routehelperConfig() {
    /* jshint validthis:true */
    this.config = {
      // These are the properties we need to set
      $stateProvider: undefined,
      $urlRouterProvider: undefined,
      docTitle: ''
      // resolveAlways: {ready: function(){ } }
    };

    this.$get = function() {
      return {
          config: this.config
      };
    };
  }

    function routehelper( $location, $rootScope, $q, $state, $timeout, $window,
      logger, routehelperConfig, commonsDataservice) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var $stateProvider = routehelperConfig.config.$stateProvider;
        var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;

        var service = {
          configureRoutes: configureRoutes,
          routeCounts: routeCounts
        };

        init();

        return service;

        function configureRoutes(routes) {
          routes.forEach(function(route) {
            route.config.resolve =
              angular.extend( route.config.resolve || {}, routehelperConfig.config.resolveAlways );
            $stateProvider.state( route.state, route.config );
          });
          $urlRouterProvider.otherwise('/');
        }

        function handleRoutingErrors() {
          /***
           ** Route cancellation
           ***/
          $rootScope.$on('$stateChangeError',
            function(event, current, previous, rejection) {
              if (handlingRouteChangeError) {
                return;
              }
              routeCounts.errors++;
              handlingRouteChangeError = true;
              var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                'unknown target';
              var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
              logger.warning(msg, [current]);
              $state.go( 'primary' );
            }
          );
        }

        function init() {
          handleRoutingErrors();
          stateStartDocTitle();
          updateDocTitle();
        }

        function stateStartDocTitle() {
          $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams) {
            if( ( toState.name === 'salesRepresentativeListing' ||
              toState.name === 'customerList' || toState.name === 'quotationList' ) &&
              fromState.name.length !== 0 ) $rootScope.showContent = false;
          }
        );
      }

        function updateDocTitle() {
          $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
              console.log( angular.element('body').css('opacity', '1') );

              if( ( toState.name === 'salesRepresentativeListing' ||
                toState.name === 'customerList' || toState.name === 'quotationList' ) &&
                fromState.name.length !== 0 ) {
                  $window.location.reload();
                } else {
                  $rootScope.showContent = true;
                }

              routeCounts.changes++;
              handlingRouteChangeError = false;
              var title = routehelperConfig.config.docTitle + ' ' + (toState.title || '');
              $rootScope.title = title; // data bind to <title>
            }
          );
        }
    }
})();
