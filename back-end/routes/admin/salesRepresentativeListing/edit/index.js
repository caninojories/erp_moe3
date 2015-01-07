(function() {
  'use strict';

  var express = require('express'),
  router  = express.Router();

  router.get('/admin/salesRepresentativeListing/edit/index.html', function( req, res ) {
    res.render('admin/salesRepresentativeListing/edit/index.html');
  });

  module.exports = router;
})();
