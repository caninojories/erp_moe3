(function() {
  'use strict';

  var express   = require('express'),
  router        = express.Router(),
  app           = express(),

  GET_CustomerList    = require('../apImpl/admin/customerList/getIndex.js'),
  GET_OneCustomer     = require('../apImpl/admin/customerList/getIndex.js'),
  PUT_OneCustomer     = require('../apImpl/admin/customerList/putIndex.js'),
  DELETE_CustomerList = require('../apImpl/admin/customerList/deleteIndex.js');

  app.route('/customerList')
    .get(GET_CustomerList.getList)
    .delete(DELETE_CustomerList.deleteOne);

  app.route('/editCustomerList')
    .get(GET_OneCustomer.getOne)
    .put(PUT_OneCustomer.putOne);

  module.exports = app;
}());
