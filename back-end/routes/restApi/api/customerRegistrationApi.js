(function(){
  'use strict';

  var express = require('express'),
      app     = express(),

      postCustomerRegistration = require( '../adminApImplementation/customerRegistration/postIndex.js' ),
      getCustomerView          = require( '../adminApImplementation/customerRegistration/getIndex.js' );

    app.route( '/saveCustomer' )
      .post( postCustomerRegistration.saveCustomer );

    app.route( '/getCustomerView' )
      .get( getCustomerView.customerView );

    module.exports = app;
}());
