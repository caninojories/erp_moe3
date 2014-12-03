
  'use strict';

  var express = require('express'),
  router   = express.Router();


  router.get('/adminPanel/quotationRegistration/index.html', function( req, res ) {
    res.render('adminPanel/quotationRegistration/index.html');
  });

  module.exports = router;
