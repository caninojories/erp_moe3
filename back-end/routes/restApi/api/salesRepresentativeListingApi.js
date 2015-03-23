(function() {
  'use strict';

  var express   = require('express'),
  router        = express.Router(),
  app           = express(),

  getSalesRepresentativeList          = require('../adminApImplementation/salesRepresentativeListing/getIndex.js'),
  DELETE_SalesRepresentativeInTheList = require('../adminApImplementation/salesRepresentativeListing/deleteIndex.js'),
  GET_OneSalesRepresentative          = require('../adminApImplementation/salesRepresentativeListing/getIndex.js'),
  PUT_SalesRepresentative             = require('../adminApImplementation/salesRepresentativeListing/putIndex.js');

  app.route('/getSalesRepresentativeList')
    .get(getSalesRepresentativeList.getSalesRepresentativeList);

  app.route('/salesRepresentativeList')
    .delete(DELETE_SalesRepresentativeInTheList.delete)
    .get(GET_OneSalesRepresentative.getOne)
    .put(PUT_SalesRepresentative.put);

  module.exports = app;
})();
