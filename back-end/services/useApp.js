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
      io.useAppConfig().invoice,
      io.useAppConfig().invoiceRegistration,
      io.useAppConfig().invoiceList,
      io.useAppConfig().editInvoiceList,
    ]);

    function useApp(param) {
      param.forEach(function(name) {
        app.use('/', name);
      });
    }
  };
}());
