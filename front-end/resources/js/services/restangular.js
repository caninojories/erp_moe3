(function() {
  'use strict';

  angular.module('app.services', [])
  /*ngInject*/
  .factory('salesRepresentativeServiceApi', ['Restangular', function (Restangular) {
    return Restangular.all('salesRepresentativeApi');
  }])
  /*ngInject*/
  .factory('customerServiceApi', ['Restangular', function(Restangular) {
    return Restangular.all('customerApi');
  }])
  /*ngInject*/
  .factory('invoiceServiceApi', ['Restangular', function(Restangular) {
    return Restangular.all('invoiceApi');
  }])
  /*ngInject*/
  .factory('settingServiceApi', ['Restangular', function(Restangular) {
    return Restangular.all('settingsApi');
  }])
  /*ngInject*/
  .factory('quotationServiceApi', ['Restangular', function(Restangular) {
    return Restangular.all('quotationApi');
  }])
  /*ngInject*/
  .factory('userServiceApi', ['Restangular', function(Restangular) {
    return Restangular.all('userApi');
  }]);
}());
