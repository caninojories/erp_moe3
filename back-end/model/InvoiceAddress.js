(function() {
  'use strict';

  var mongoose = require('mongoose');

  var InvoiceAddressSchema = new mongoose.Schema({
    address: String,
    country: String,
    state: String,
    zipcode: Number,
    Phone: Number,
    Fax: Number,
    Email: Number
  });

  module.exports = mongoose.model('InvoiceAddress', InvoiceAddressSchema);
}());
