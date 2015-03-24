(function() {

  'use strict';

  var express = require('express'),
      router   = express.Router();

  router.get('/admin/primary/index.html', io.xPoweredBy, io.languageLocale, function(req, res) {
    res.render('admin/primary/index.html');
  });

  module.exports = router;
}());
