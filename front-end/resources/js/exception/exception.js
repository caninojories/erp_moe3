(function() {
  'use strict';

  angular
  .module('blocks.exception')
  .factory('exception', exception);

  /* @ngInject */
  function exception(logger) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message) {
      return logger.error(message);
    }
  }
})();
