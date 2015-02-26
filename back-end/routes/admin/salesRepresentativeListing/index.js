(function() {
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.get('/admin/salesRepresentativeListing/index.html', function(req, res) {
    res.render('admin/salesRepresentativeListing/index.html', {title: 'salesRepresentativeListing'});
  });

  module.exports = router;
})();
