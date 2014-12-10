(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate',
        'ui.router',
        'restangular',
        //'ngSanitize',
        /*
         * Commons module
        **/
        'app.commons',
        /*
         * Our reusable cross app code modules
         */
        //'blocks.exception',
        'blocks.logger',
        'blocks.router',
        'blocks.exception',
        'strapService',
        /*
         * 3rd Party modules
         */
        'angular-flash.service',
        'angular-flash.flash-alert-directive',
        'mgcrea.ngStrap',
        'ngplus',
        'ngTable',
        'ui.bootstrap'
    ]);
})();
