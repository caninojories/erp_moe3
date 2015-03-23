(function() {
  'use strict';

  var express   = require('express'),
  router        = express.Router(),
  app           = express(),

  GET_CustomerList    = require('../adminApImplementation/customerList/getIndex.js'),
  GET_OneCustomer     = require('../adminApImplementation/customerList/getIndex.js'),
  PUT_OneCustomer     = require('../adminApImplementation/customerList/putIndex.js'),
  DELETE_CustomerList = require('../adminApImplementation/customerList/deleteIndex.js');

  app.route('/customerList')
    .get(GET_CustomerList.getList)
    .delete(DELETE_CustomerList.deleteOne);

  app.route('/editCustomerList')
    .get(GET_OneCustomer.getOne)
    .put(PUT_OneCustomer.putOne);

  module.exports = app;
}());
