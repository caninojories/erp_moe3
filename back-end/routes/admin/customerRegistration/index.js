
  'use strict';

  var express = require('express'),
  router   = express.Router();


  router.get('/admin/customerRegistration/index.html', function( req, res ) {
    res.render('admin/customerRegistration/index.html');
  });

  module.exports = router;
