
  'use strict';

  var express = require('express'),
  router   = express.Router();


  router.get('/adminPanel/invoiceRegistration/index.html', function( req, res ) {
    res.render('adminPanel/invoiceRegistration/index.html');
  });

  module.exports = router;
