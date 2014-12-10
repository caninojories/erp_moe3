
  'use strict';

  var express = require('express'),
  router   = express.Router();


  router.get('/admin/salesRepresentativeRegistration/index.html', function( req, res ) {
    res.render('admin/salesRepresentativeRegistration/index.html');
  });

  module.exports = router;
