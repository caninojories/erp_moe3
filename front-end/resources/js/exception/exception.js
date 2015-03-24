(function() {
  'use strict';

  angular
  .module('blocks.exception')
  .factory('exception', exception);

  exception.$inject = ['logger'];
  /* @ngInject */
  function exception(logger) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message, data) {
      return logger.error(message, data);
    }
  }
})();
