(function() {
  'use strict';

  angular
    .module('app.services')
    .service('strapAlert', strapAlert);

  strapAlert.$inject = ['$alert'];
  /* @ngInject */
  function strapAlert($alert) {
    /*jshint validthis:true */
    var vm = this;

    /* Literals */
    vm.alerObj = null;
    /* Functions */
    vm.alert = alert;
    vm.show  = show;
    vm.hide  = hide;

    function show(title, content, type, container) {
      vm.alerObj = vm.alert(title, content, type, container );
    }

    function hide() {
      vm.alerObj.hide();
    }

    function alert(title, content, type, container) {
      var strapAlert = $alert({
        title: title,
        content: content,
        type: type || 'info',
        container: container || 'alert-info',
        show: true
      });

      return strapAlert;
    }
  }
}());
