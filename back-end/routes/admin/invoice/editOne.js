(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/invoice/editOne.html', function(req, res) {
    res.render('admin/invoice/editOne.html');
  });

  module.exports = router;
}());
