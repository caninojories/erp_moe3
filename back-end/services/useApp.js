(function() {
  'use strict';

  module.exports = function(app) {
    useApp([
      io.useAppConfig().primary,
      io.useAppConfig().salesRepresentativeRegistration,
      io.useAppConfig().salesRepresentativeListing,
      io.useAppConfig().editSalesRepresentativeListing,
      io.useAppConfig().customerRegistration,
      io.useAppConfig().customerList,
      io.useAppConfig().editCustomerList,
      io.useAppConfig().quotationRegistration,
      io.useAppConfig().quotationList,
      io.useAppConfig().editQuotationList,
      io.useAppConfig().invoice.registration,
      io.useAppConfig().invoice.viewOne,
      io.useAppConfig().invoice.viewList,
      io.useAppConfig().invoice.editOne,
    ]);

    function useApp(param) {
      param.forEach(function(name) {
        app.use('/', name);
      });
    }
  };
}());
