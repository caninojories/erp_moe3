
  'use strict';

  var express = require('express'),
      router   = express.Router();


  router.get('/adminPanel/primary/index.html', function( req, res ) {
    res.render('adminPanel/primary/index.html');
  });

  module.exports = router;
