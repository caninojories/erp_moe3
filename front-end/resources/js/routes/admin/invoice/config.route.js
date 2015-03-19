(function() {
  'use strict';

  angular
    .module('app.invoice')
    .run(appRun);

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'registration',
        config: {
          url: '/invoice/register',
          templateUrl: '/admin/invoice/registration.html',
          controller: 'Registration as vm',
          title: 'Invoice Registration'
        }
      }, {
        state: 'viewOne',
        config: {
          url: '/invoice/view/:id',
          templateUrl: '/admin/invoice/viewOne.html',
          controller: 'ViewOne as vm'
        }
      }, {
        state: 'viewList',
        config: {
          url: '/invoice/list',
          templateUrl: '/admin/invoice/viewList.html',
          controller: 'ViewList as vm',
          title: 'Invoice View List'
        }
      }, {
        state: 'editOne',
        config: {
          url: '/invoice/edit/:id',
          templateUrl: '/admin/invoice/editOne.html',
          controller: 'EditOne as vm',
          title: 'Edit One Invoice'
        }
      }, {
        state: 'forecast',
        config: {
          url: '/invoice/forecast',
          templateUrl: '/admin/invoice/forecast.html',
          controller: 'Forecast as vm',
          title: 'Forecast Invoice'
        }
      }];
    }
})();
