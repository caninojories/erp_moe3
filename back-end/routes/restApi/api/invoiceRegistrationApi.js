(function() {
  'use strict';

  var express = require('express'),
      app     = express(),

      POST_InvoiceRegistration = require('../apImpl/admin/invoiceRegistration/postIndex');

  app.route('/invoiceRegistration')
    .post(POST_InvoiceRegistration.post);

  module.exports = app;
}());
