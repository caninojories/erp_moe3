(function(){
  'use strict';

  angular
    .module('app.primary')
    .run(appRun);

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'primary',
        config: {
          url: '/',
          templateUrl: '/adminPanel/primary/index.html',
          controller: 'Primary as vm',
          title: 'Primary'
        }
      }];
    }

})();
