
  'use strict';

  var express = require('express'),
  router   = express.Router();


  router.get('/admin/quotationRegistration/index.html', function( req, res ) {
    res.render('admin/quotationRegistration/index.html', {title: 'quotationRegistration'});
  });

  module.exports = router;
