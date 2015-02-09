(function() {
  'use strict';

  angular.module('ngAPI', [
    /***
     ** Order is not important. Angular makes a
     ** pass to register all of the modules listed
     ** and then when app.dashboard tries to use app.data,
     ** it's components are available.
     ***/

    /***
     ** Everybody has access to these.
     ** We could place these under every feature area,
     ** but this is easier to maintain.
     ***/
    'app.core',

    /***
     ** Feature areas
     ***/
    'app.sample',
    'app.primary',
    'app.salesRepresentativeRegistration',
    'app.salesRepresentativeListing',
    'app.customerRegistration',
    'app.customerList',
    'app.quotationRegistration',
    'app.quotationList',
    'app.invoiceRegistration',
    'app.invoiceList',


    /*
     * Restangular Service
    **/



    /***
     ** Restangular Service
     ***/
  ]);
})();
