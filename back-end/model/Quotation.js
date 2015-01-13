(function() {
  'use strict';

  var mongoose = require( 'mongoose' );

  var QuotationSchema = new mongoose.Schema({
    date: Date,
    quotationNumber: String,
    postalCode: Number,
    salesRepFirstName: String,
    salesRepLastName : String,
    salesOfficeAddress1: String,
    salesOfficeAddress2: String,
    salesOfficeAddress3: String,
    salesOfficePhoneNumber: Number,
    customerFirstName: String,
    customerLastName: String,
    subject: String,
    item: Array
  });

  module.exports = mongoose.model( 'Quotation', QuotationSchema );
}());
