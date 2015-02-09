(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get( '/admin/invoiceList/edit/index.html', function( req, res ) {
    res.render( 'admin/invoiceList/edit/index.html' );
  });

  module.exports = router;
}());
