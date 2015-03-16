(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/invoice/registration.html', io.authorize, io.xPoweredBy, function(req, res) {
    res.render('admin/invoice/registration.html');
  });

  module.exports = router;
}());
