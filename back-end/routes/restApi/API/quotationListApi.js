(function() {
  'use strict';

  var express = require( 'express' ),
      app     = express(),

      GET_QuotationList = require( '../adminApImplementation/quotationList/getIndex.js');

  app.route( '/quotationList' )
    .get( GET_QuotationList.getList );

  module.exports = app;
}());
