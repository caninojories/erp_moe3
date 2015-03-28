(function() {
  'use strict';

  angular
  .module('app.sample')
  .controller('Sample', Sample);

  Sample.$inject = ['logger'];
  /*@ngInject*/
  function Sample(logger) {
    var vm = this;

    logger.success('Sample View Activated');

  }
})();
