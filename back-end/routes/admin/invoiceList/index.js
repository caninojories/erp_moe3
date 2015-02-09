(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get( '/admin/invoiceList/index.html', function( req, res ) {
    res.render( 'admin/invoiceList/index.html' );
  });

  module.exports = router;
}());
