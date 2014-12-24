
  'use strict';

  var express = require('express'),
  router   = express.Router();


  router.get('/admin/invoiceRegistration/index.html', function( req, res ) {
    res.render('admin/invoiceRegistration/index.html', {title: 'invoiceRegistration'});
  });

  module.exports = router;
