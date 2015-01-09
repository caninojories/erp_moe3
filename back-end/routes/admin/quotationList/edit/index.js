(function() {
  'use strict';

  var express = require('express'),
  router  = express.Router();

  router.get('/admin/quotationList/edit/index.html', function( req, res ) {
    res.render('admin/quotationList/edit/index.html');
  });

  module.exports = router;
})();
