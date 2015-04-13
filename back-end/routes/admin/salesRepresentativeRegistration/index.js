(function() {

  'use strict';

  var express = require('express'),
  router   = express.Router();

  router.get('/admin/salesRepresentativeRegistration/index.html', io.xPoweredBy, io.languageLocale, io.authorize,
    function(req, res) {
      res.render('admin/salesRepresentativeRegistration/index.html', {title: 'salesRepresentativeRegistration'});
    });

  module.exports = router;
}());
