(function() {
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.get('/admin/salesRepresentativeListing/index.html', function( reqw, res ) {
    res.render('admin/salesRepresentativeListing/index.html');
  });

  module.exports = router;
})();
