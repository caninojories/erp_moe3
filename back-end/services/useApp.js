(function() {
  'use strict';

  module.exports = function(app) {
    useApp([
      global.io.useAppConfig().primary,
      global.io.useAppConfig().salesRepresentativeRegistration,
      global.io.useAppConfig().salesRepresentativeListing,
      global.io.useAppConfig().editSalesRepresentativeListing,
      global.io.useAppConfig().customerRegistration,
      global.io.useAppConfig().customerList,
      global.io.useAppConfig().editCustomerList,
      global.io.useAppConfig().quotationRegistration,
      global.io.useAppConfig().quotationList,
      global.io.useAppConfig().editQuotationList,
      global.io.useAppConfig().invoiceRegistration,
      global.io.useAppConfig().invoiceList,
      global.io.useAppConfig().editInvoiceList,
    ]);

    function useApp(param) {
      param.forEach(function(name) {
        app.use('/', name);
      });
    }
  };
}());
