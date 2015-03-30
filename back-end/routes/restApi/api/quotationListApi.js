(function() {
  'use strict';

  var express = require('express'),
      app     = express(),

      GET_QuotationList     = require('../apImpl/admin/quotationList/getIndex.js'),
      DELETE_QuotationList  = require('../apImpl/admin/quotationList/deleteIndex.js'),

      GET_OneQuotation      = require('../apImpl/admin/quotationList/getIndex.js'),
      PUT_OneQuotation      = require('../apImpl/admin/quotationList/putIndex.js');

  app.route('/quotationList')
    .get(GET_QuotationList.getList)
    .delete(DELETE_QuotationList.deleteOne);

  app.route('/editQuotationList')
    .get(GET_OneQuotation.getOne)
    .put(PUT_OneQuotation.putOne);

  module.exports = app;
}());
