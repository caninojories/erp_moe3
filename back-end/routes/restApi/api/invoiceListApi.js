(function() {
  'use strict';

  var app = io.express(),

  GET_InoviceList     = require('../apImpl/admin/invoiceList/getIndex.js'),
  DELETE_InvoiceList  = require('../apImpl/admin/invoiceList/deleteIndex.js'),

  GET_OneInvoice      = require('../apImpl/admin/invoiceList/getIndex.js'),
  PUT_OneInvoice      = require('../apImpl/admin/invoiceList/putIndex.js');

  app.route('/invoiceList')/* /view/list */
  .get(GET_InoviceList.getList)
  .delete(DELETE_InvoiceList.deleteOne);

  app.route('/editInvoiceList')
  .get(GET_OneInvoice.getOne)
  .put(PUT_OneInvoice.putOne);

  //app.route('/add/invoceAdress')

  module.exports = app;
}());
