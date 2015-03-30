(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/invoice/registration.html', io.xPoweredBy, io.languageLocale, io.authorize, function(req, res) {
    res.render('admin/invoice/registration.html');
  });

  module.exports = router;
}());
