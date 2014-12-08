(function() {
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.get('/adminPanel/salesRepresentativeListing/index.html', function( reqw, res ) {
    res.render('adminPanel/salesRepresentativeListing/index.html');
  });

  module.exports = router;
})();
