(function() {
  'use strict';

  var express = require( 'express' ),
      app     = express(),

      POST_InvoiceRegistration = require( '../adminApImplementation/invoiceRegistration/postIndex' );

  app.route( '/invoiceRegistration' )
    .post( POST_InvoiceRegistration.post );

  module.exports = app;
}());
