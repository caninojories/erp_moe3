(function() {
  'use strict';

  var mongoose  = require( 'mongoose' );

  var CustomerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    position: String,
    personInCharge: String,
    phoneNumber: String,
    postalCode: String,
    customerAdd1: String,
    customerAdd2: String,
    customerAdd3: String,
    email: String,
    paymentTerms: String,
  });

  module.exports = mongoose.model( 'Customer', CustomerSchema );
}());
