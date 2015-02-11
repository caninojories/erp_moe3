(function() {
  'use strict';

  module.exports = function(app) {
    useApp([
      global.io.primary,
      global.io.salesRepresentativeRegistration,
      global.io.salesRepresentativeListing,
      global.io.editSalesRepresentativeListing,
      global.io.customerRegistration,
      global.io.customerList,
      global.io.editCustomerList,
      global.io.quotationRegistration,
      global.io.quotationList,
      global.io.editQuotationList,
      global.io.invoiceRegistration,
      global.io.invoiceList,
      global.io.editInvoiceList
    ]);

    function useApp(param) {
      param.forEach(function(name) {
        app.use('/', name);
      });
    }
  };
}());
