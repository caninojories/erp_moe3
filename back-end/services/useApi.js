(function() {
  'use strict';

  module.exports = function(app) {
    return useApi([{
      name: '/salesRepresentativeApi',
      url: io.useApiConfig().salesRepresentativeListingApi
    }, {
      name: '/customerApi',
      url: io.useApiConfig().customerRegistrationApi
    }, {
      name: '/customerApi',
      url: io.useApiConfig().customerListApi
    }, {
      name: '/settingsApi',
      url: io.useApiConfig().settings
    }, {
      name: '/quotationApi',
      url: io.useApiConfig().quotationRegistrationApi
    }, {
      name: '/quotationApi',
      url: global.io.useApiConfig().quotationListApi
    }, {
      name: '/invoiceApi',
      url: io.useApiConfig().invoice
    }, {
      name: '/userApi',
      url: io.useApiConfig().emailTakenApi
    }, {
      name: '/userApi',
      url: io.useApiConfig().userSignUpApi
    }]);

    function useApi(param) {
      for (var key in param) {
       if (param.hasOwnProperty(key)) {
          var obj = param[key];
          app.use(obj.name, obj.url);
        }
      }
    }
  };

}());
