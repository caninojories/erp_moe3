(function() {
  'use strict';

  var mongoose = require( 'mongoose' );

  var SalesRepresentativeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    postalCode: String,
    salesOfficeAddress1: String,
    salesOfficeAddress2: String,
    salesOfficeAddress3: String,
    salesOfficePhoneNumber: String
  });

  module.exports = mongoose.model( 'SalesRepresentative', SalesRepresentativeSchema );

}());
