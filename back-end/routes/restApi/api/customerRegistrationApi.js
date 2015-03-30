(function() {
  'use strict';

  var express = require('express'),
      app     = express(),

      POST_CustomerRegistration = require('../apImpl/admin/customerRegistration/postIndex.js'),
      GET_CustomerRegistration  = require('../apImpl/admin/customerRegistration/getIndex.js');

    app.route('/customerRegistration')
      .get(GET_CustomerRegistration.getOne)
      .post(POST_CustomerRegistration.post);

    module.exports = app;
}());
