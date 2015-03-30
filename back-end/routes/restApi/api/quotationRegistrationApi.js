(function() {
  'use strict';

  var express = require('express'),
      app     = express(),

      POST_QuotationRegistration = require('../apImpl/admin/quotationRegistration/postIndex.js');

  app.route('/quotationRegistration')
    .post(POST_QuotationRegistration.post);

  module.exports = app;
}());
