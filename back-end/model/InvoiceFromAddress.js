(function() {
  'use strict';

  var mongoose = require('mongoose');

  var InvoiceFromAddressSchema = new mongoose.Schema({
    name    : String,
    address : String,
    country : String,
    state   : String,
    zipcode : String,
    phone   : String,
    fax     : String,
    email   : String
  });

  module.exports = mongoose.model('InvoiceFromAddress', InvoiceFromAddressSchema);
}());
