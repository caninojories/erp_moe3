(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/invoice/viewList.html', io.xPoweredBy, io.languageLocale, io.authorize, function(req, res) {
    res.render('admin/invoice/viewList.html');
  });

  module.exports = router;
}());
