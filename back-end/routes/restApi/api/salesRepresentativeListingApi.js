(function() {
  'use strict';

  var express   = require('express'),
  router        = express.Router(),
  app           = express(),

  getSalesRepresentativeList = require( '../adminApImplementation/salesRepresentativeListing/getIndex.js' );

  app.route( '/getSalesRepresentativeList' )
  .get( getSalesRepresentativeList.getSalesRepresentativeList );

  module.exports = app;
})();
