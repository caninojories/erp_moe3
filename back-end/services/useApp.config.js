(function() {
  'use strict';

  module.exports = function() {
    var adminRoutes = global.io.rootPath + 'back-end/routes/admin/';
    var useApp = {
      primary                         : require(adminRoutes + 'primary'),
      salesRepresentativeRegistration : require(adminRoutes + 'salesRepresentativeRegistration'),
      salesRepresentativeListing      : require(adminRoutes + 'salesRepresentativeListing'),
      editSalesRepresentativeListing  : require(adminRoutes + 'salesRepresentativeListing/edit'),
      customerRegistration            : require(adminRoutes + 'customerRegistration'),
      customerList                    : require(adminRoutes + 'customerList'),
      editCustomerList                : require(adminRoutes + 'customerList/edit'),
      quotationRegistration           : require(adminRoutes + 'quotationRegistration'),
      quotationList                   : require(adminRoutes + 'quotationList'),
      editQuotationList               : require(adminRoutes + 'quotationList/edit'),
      invoice                         : require(adminRoutes + 'invoice/viewOne'),
      invoiceRegistration             : require(adminRoutes + 'invoiceRegistration'),
      invoiceList                     : require(adminRoutes + 'invoiceList'),
      editInvoiceList                 : require(adminRoutes + 'invoiceList/edit')
    };
    return useApp;
  };
}());
