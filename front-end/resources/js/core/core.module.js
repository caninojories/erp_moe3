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
        'app.others',
        'app.register',
        'app.services',
        'app.signin',
        'app.widgets',
        'ngConfig',

        /*
         * Our reusable cross app code modules
         */
        'blocks.logger',
        'blocks.router',
        'blocks.exception',

        /*
         * 3rd Party modules
         */
        // 'angular-flash.service',
        // 'angular-flash.flash-alert-directive',
        //'ui.bootstrap',
        'mgcrea.ngStrap',
        'satellizer',
        'angular-loading-bar',
        'xeditable'
    ]);
})();
