(function() {
  'use strict';

  var express = require('express'),
  app         = express(),

  GET_InoviceList     = require('../adminApImplementation/invoiceList/getIndex.js'),
  DELETE_InvoiceList  = require('../adminApImplementation/invoiceList/deleteIndex.js'),

  GET_OneInvoice      = require('../adminApImplementation/invoiceList/getIndex.js'),
  PUT_OneInvoice      = require('../adminApImplementation/invoiceList/putIndex.js');

  app.route('/invoiceList')
  .get(GET_InoviceList.getList)
  .delete(DELETE_InvoiceList.deleteOne);

  app.route('/editInvoiceList')
  .get(GET_OneInvoice.getOne)
  .put(PUT_OneInvoice.putOne);

  module.exports = app;
}());
