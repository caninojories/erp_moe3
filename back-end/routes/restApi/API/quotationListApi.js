(function() {
  'use strict';

  var express = require( 'express' ),
      app     = express(),

      GET_QuotationList     = require( '../adminApImplementation/quotationList/getIndex.js' ),
      DELETE_QuotationList  = require( '../adminApImplementation/quotationList/deleteIndex.js' ),

      GET_OneQuotation      = require( '../adminApImplementation/quotationList/getIndex.js' ),
      PUT_OneQuotation      = require( '../adminApImplementation/quotationList/putIndex.js' );

  app.route( '/quotationList' )
    .get( GET_QuotationList.getList )
    .delete( DELETE_QuotationList.deleteOne );

  app.route( '/editQuotationList' )
    .get( GET_OneQuotation.getOne )
    .put( PUT_OneQuotation.putOne );

  module.exports = app;
}());
