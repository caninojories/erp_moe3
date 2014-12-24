(function() {
  'use strict';

  var express   = require('express'),
  router        = express.Router(),
  app           = express(),

  getCustomerList = require( '../adminApImplementation/customerList/getIndex.js' ),
  deleteCustomer  = require( '../adminApImplementation/customerList/deleteIndex.js' );

  app.route( '/getCustomerList' )
    .get( getCustomerList.getCustomerList );

  app.route( '/deleteCustomer' )
    .delete( deleteCustomer.deleteCustomer );

  module.exports = app;
}());
