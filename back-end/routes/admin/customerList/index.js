(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/customerList/index.html', function( req, res ) {
    res.render('admin/customerList/index.html', {title: 'customerList'});
  });

  module.exports = router;
}());
