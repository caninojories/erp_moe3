(function() {
  'use strict';

  angular.module('app.services', [])
  .factory('salesRepresentativeServiceApi', function (Restangular) {
    return Restangular.all('salesRepresentativeApi');
  })
  .factory('customerServiceApi', function(Restangular) {
    return Restangular.all('customerApi');
  })
  .factory('invoiceServiceApi', function(Restangular) {
    return Restangular.all('invoiceApi');
  })
  .factory('settingServiceApi', function(Restangular) {
    return Restangular.all('settingsApi');
  })
  .factory('quotationServiceApi', function(Restangular) {
    return Restangular.all('quotationApi');
  })
  .factory('userServiceApi', function(Restangular) {
    return Restangular.all('userApi');
  });
}());
