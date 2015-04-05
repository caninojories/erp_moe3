(function() {
  'use strict';

  angular
    .module('app.services')
    .run(appRun);

    appRun.$inject = ['routehelper'];
    /*ngInject*/
    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: '404',
        config: {
          template: '<div class="container text-center">' +
          '<h1>Page Not Found <small><font face="Tahoma" color="red">Error 404</font></small></h1>' +
          '<br>' +
          '<p>The page you requested could not be found, either contact your webmaster or try again.' +
          'Use your browsers <b> Back </b> button to navigate to the page you have prevously come from</p>' +
          '<p><b>Or you could just press this neat little button:</b></p>' +
          '<a ui-sref="primary" class="btn btn-large btn-info"><i class="icon-home icon-white"></i> Take Me Home</a>' +
        '</div>'
        }
      }, {
        state: '401',
        config: {
          template: '<div class="container text-center">' +
          '<h1>UNAUTHORIZED <small><font face="Tahoma" color="red">Error 401</font></small></h1>' +
          '<br>' +
          '<p>The page you requested could not be access, either contact your webmaster or log-in to your account.' +
          'Use your browsers <b>Back</b> button to navigate to the page you have prevously come from</p>' +
          '<p><b>Or you could just press this neat little button:</b></p>' +
          '<a ui-sref="primary" class="btn btn-large btn-info"><i class="icon-home icon-white"></i> Take Me Home</a>' +
        '</div>'
        }
      }];
    }
})();
