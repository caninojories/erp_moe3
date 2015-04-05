(function() {
  'use strict';

  angular
    .module('app.invoice')
    .controller('ViewOne', ViewOne);

    ViewOne.$inject = ['$q', '$stateParams', 'commonsDataService', 'invoiceServiceApi'];
    /*@ngInject*/
    function ViewOne($q, $stateParams, commonsDataService, invoiceServiceApi) {
      var vm = this;
      vm.item = null;

      invoiceGetOne();

      function invoiceGetOne() {
        return $q.all([invoiceGetOneCallback()])
          .then(function(response) {
            console.log(response);
            vm.obj = response[0].data;
            vm.from = response[0].from;
            vm.to   = response[0].to;
          });
      }

      function invoiceGetOneCallback() {
        return commonsDataService
          .httpGETQueryParams('', {id:$stateParams.id}, invoiceServiceApi)
          .then(function(response) {
            return response;
          });
      }
    }
}());
