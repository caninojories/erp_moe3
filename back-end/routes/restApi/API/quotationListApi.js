(function() {
  'use strict';

  var express = require( 'express' ),
      app     = express(),

      GET_QuotationList     = require( '../adminApImplementation/quotationList/getIndex.js' ),
      DELETE_QuotationList  = require( '../adminApImplementation/quotationList/deleteIndex.js' );

  app.route( '/quotationList' )
    .get( GET_QuotationList.getList )
    .delete( DELETE_QuotationList.deleteOne );

  module.exports = app;
}());
