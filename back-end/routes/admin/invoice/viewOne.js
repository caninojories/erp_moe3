(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/invoice/viewOne.html', function(req, res) {
    res.render('admin/invoice/viewOne.html');
  });

  module.exports = router;
}());
