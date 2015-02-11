(function() {
  'use strict';

  module.exports = function(app) {
    // global.io
    app.use( '/salesRepresentativeApi', global.io.salesRepresentativeRegistrationApi );
    app.use( '/salesRepresentativeApi', global.io.salesRepresentativeListingApi );
    app.use( '/customerApi', global.io.customerRegistrationApi );
    app.use( '/customerApi', global.io.customerListApi );
    app.use( '/quotationApi', global.io.quotationRegistrationApi );
    app.use( '/quotationApi', global.io.quotationListApi );
    app.use( '/invoiceApi', global.io.invoiceRegistrationApi );
    app.use( '/invoiceApi', global.io.invoiceListApi );
    app.use( '/userApi', global.io.emailTakenApi );
    app.use( '/userApi', global.io.userSignUpApi);
    return app;
  };
}());
