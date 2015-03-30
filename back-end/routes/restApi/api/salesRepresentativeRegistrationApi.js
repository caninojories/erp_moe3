(function() {
  'use strict';

    var express   = require('express'),
    router        = express.Router(),
    app           = express(),

    postRegisterSalesRepresentative = require('../apImpl/admin/salesRepresentativeRegistration/postIndex.js');

    app.route('/saveSalesRepresentative')
    .post(postRegisterSalesRepresentative.saveSalesRepresentative);

    module.exports = app;
}());
