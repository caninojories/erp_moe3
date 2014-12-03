
  'use strict';

  var express = require('express'),
  router   = express.Router();


  router.get('/adminPanel/customerRegistration/index.html', function( req, res ) {
    res.render('adminPanel/customerRegistration/index.html');
  });

  module.exports = router;
