(function() {
  'use strict';

  var mongoose = require( 'mongoose' );

  var QuotationSchema = new mongoose.Schema({
    date: String,
    department: String,
    postalCode: Number,
    salesRepFirstName: String,
    salesRepLastName : String,
    salesOfficeAddress1: String,
    salesOfficeAddress2: String,
    salesOfficeAddress3: String,
    salesOfficePhoneNumber: Number,
    customerFirstName: String,
    customerLastName: String,
    title: String,
    quantity: String,
    unitPrice: String,
    amount: Number,
    status: String,
    condition: String,
    remark: String,
    salesProgress: String,
    spot: String,
    noteForQuotation: String,
    comment: String,
    note: String
  });

  module.exports = mongoose.model( 'Quotation', QuotationSchema );
}());
