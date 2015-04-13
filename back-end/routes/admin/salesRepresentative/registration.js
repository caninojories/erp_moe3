(function() {

  'use strict';

  var express = require('express'),
  router   = express.Router();

  router.get('/admin/salesRepresentative/registration.html', io.xPoweredBy, io.languageLocale, io.authorize,
    function(req, res) {
      res.render('admin/salesRepresentative/registration.html', {title: 'salesRepresentativeRegistration'});
    });

  module.exports = router;
}());
