
  'use strict';

  var express = require('express'),
      router   = express.Router();


  router.get('/admin/primary/index.html', function( req, res ) {
    res.render('admin/primary/index.html');
  });

  module.exports = router;
