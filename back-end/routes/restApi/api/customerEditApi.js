(function() {
  'use strict';

  var express   = require('express'),
  router        = express.Router(),
  app           = express(),

  getCustomerInfo = require( '../adminApImplementation/customerEdit/getIndex.js' ),
  updateCustomerInfo = require( '../adminApImplementation/customerEdit/putIndex.js' );

  app.route( '/customerInformation' )
    .get( getCustomerInfo.getCustomerInformation )
    .put( updateCustomerInfo.updateCustomerInformation );

  module.exports = app;
}());
