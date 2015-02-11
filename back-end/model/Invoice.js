(function() {
  'use strict';

  var mongoose = require( 'mongoose' );

  var InvoiceSchema = new mongoose.Schema({
    date                  : Date,
    invoiceNumber         : Number,
    postalCode            : Number,
    customerFirstName     : String,
    customerLastName      : String,
    subject               : String,
    salesRepFirstName     : String,
    salesRepLastName      : String,
    salesOfficeAddress1   : String,
    salesOfficeAddress2   : String,
    salesOfficeAddress3   : String,
    salesOfficePhoneNumber: Number,
    item: [{
      name              : String,
      quantity          : Number,
      unitPrice         : Number,
      amount            : Number,
      status            : String,
      deliveryDate      : Date,
      dateOfPayment     : Date,
      deliveryMethod    : String,
      noteForInvoice    : String,
      accountantComment : String,
      accountantNote    : String
    }]
  });

  InvoiceSchema.pre( 'save', function( next ) {
    var invoice = this;
    invoice.item.forEach(function( data ) {
      try {
        delete data.show;
      } catch(e) {

      }
    });
    next();
  });

  module.exports = mongoose.model( 'Invoice', InvoiceSchema );
}());
