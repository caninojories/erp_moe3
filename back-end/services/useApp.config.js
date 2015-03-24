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
      invoice                         : {
        editOne             : require(adminRoutes + 'invoice/editOne'),
        forecast            : require(adminRoutes + 'invoice/forecast'),
        fromAddressViewList : require(adminRoutes + 'invoice/fromAddressViewList'),
        toAddressViewList   : require(adminRoutes + 'invoice/toAddressViewList'),
        registration        : require(adminRoutes + 'invoice/registration'),
        viewOne             : require(adminRoutes + 'invoice/viewOne'),
        viewList            : require(adminRoutes + 'invoice/viewList'),
      }
    };
    return useApp;
  };
}());
