(function() {
  'use strict';

  var express = require('express'),
  router  = express.Router();

  router.get('/admin/quotationList/index.html', function(req, res) {
    res.render('admin/quotationList/index.html');
  });

  module.exports = router;
}());
