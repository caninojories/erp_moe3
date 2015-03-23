(function() {
  'use strict';

  module.exports = function() {
    var routesApi = root('back-end/routes/restApi/API/');

    var useApi = {
      salesRepresentativeRegistrationApi  : require(routesApi + 'salesRepresentativeRegistrationApi'),
      salesRepresentativeListingApi       : require(routesApi + 'salesRepresentativeListingApi'),
      customerRegistrationApi             : require(routesApi + 'customerRegistrationApi'),
      customerListApi                     : require(routesApi + 'customerListApi'),
      quotationRegistrationApi            : require(routesApi + 'quotationRegistrationApi'),
      quotationListApi                    : require(routesApi + 'quotationListApi'),
      invoice                             : require(routesApi + 'invoice'),
      emailTakenApi                       : require(routesApi + 'register'),
      userSignUpApi                       : require(routesApi + 'login'),
      registerApi                         : require(routesApi + 'register'),
      login                               : require(routesApi + 'login'),
      settings                            : require(routesApi + 'settings')
    };
    return useApi;
  };
}());
