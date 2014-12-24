(function() {
  'use strict';

  var express = require('express'),
  router  = express.Router();

  router.get('/admin/customerEdit/index.html', function( req, res ) {
    res.render('admin/customerEdit/index.html', {title: 'customerList'});
  });

  module.exports = router;
}());
