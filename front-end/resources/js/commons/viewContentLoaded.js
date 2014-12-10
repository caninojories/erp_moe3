(function() {
  'use strict';

  angular
    .module('commons.control')
    .factory('viewContentLoaded', viewContentLoaded);

    viewContentLoaded.$inject = [ '$rootScope', 'logger' ];

    function viewContentLoaded ( $rootScope, logger ) {
      /***
       ** Sample external jquery call
       ***/
      return {
        loadScript : function loadScript() {
          $rootScope.$on('$viewContentLoaded', function() {
            jcaLayout.fullPage();
          });
        },
        carouselScript : function carouselScript() {
          $rootScope.$on('$viewContentLoaded', function() {
            jcaLayout.carousel();
          });
        }
      };
    }
})();
