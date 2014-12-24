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
        'blocks.logger',
        'blocks.router',
        'blocks.exception',
        'strapService',

        /*
         * 3rd Party modules
         */
        'angular-flash.service',
        'angular-flash.flash-alert-directive',
        'ngplus',
        'ngTable',
        //'ui.bootstrap',
        'satellizer'
    ]);
})();
