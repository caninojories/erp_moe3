(function() {
  'use strict';

  angular
    .module('app.invoice')
    .run(appRun);

    appRun.$inject = ['routehelper'];
    /*ngInject*/
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
          title: 'Invoice Registration',
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
          title: 'Invoice View List',
          resolve: {
            authorize: function() {

            }
          }
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
      }, {
        state: 'fromAddressViewList',
        config: {
          url: '/invoice/fromAddress/list',
          templateUrl: '/admin/invoice/fromAddressViewList.html',
          controller: 'FromAddressViewList as vm',
          title: 'FromAddress View List Invoice'
        }
      }, {
        state: 'toAddressViewList',
        config: {
          url: '/invoice/toAddress/list',
          templateUrl: '/admin/invoice/toAddressViewList.html',
          controller: 'ToAddressViewList as vm',
          title: 'ToAddress View List Invoice'
        }
      }];
    }
})();
