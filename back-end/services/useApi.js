(function() {
  'use strict';

  module.exports = function(app) {
    return useApi([{
      name: '/salesRepresentativeApi',
      url: global.io.useApiConfig().salesRepresentativeRegistrationApi
    }, {
      name: '/salesRepresentativeApi',
      url: global.io.useApiConfig().salesRepresentativeListingApi
    }, {
      name: '/customerApi',
      url: global.io.useApiConfig().customerRegistrationApi
    }, {
      name: '/customerApi',
      url: global.io.useApiConfig().customerListApi
    }, {
      name: '/quotationApi',
      url: global.io.useApiConfig().quotationRegistrationApi
    }, {
      name: '/quotationApi',
      url: global.io.useApiConfig().quotationListApi
    }, {
      name: '/invoiceApi',
      url: global.io.useApiConfig().invoice
    }, {
      name: '/userApi',
      url: global.io.useApiConfig().emailTakenApi
    }, {
      name: '/userApi',
      url: global.io.useApiConfig().userSignUpApi
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
