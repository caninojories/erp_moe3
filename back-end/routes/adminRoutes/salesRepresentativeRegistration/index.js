
  'use strict';

  var express = require('express'),
  router   = express.Router();


  router.get('/adminPanel/salesRepresentativeRegistration/index.html', function( req, res ) {
    res.render('adminPanel/salesRepresentativeRegistration/index.html');
  });

  module.exports = router;
