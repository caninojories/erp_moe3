(function() {
  'use strict';

  var mongoose = require('mongoose');

  var InvoiceSchema = new mongoose.Schema({
    number  : Number,
    date    : Date,
    terms   : String,
    dueDate : Date,
    from    : String,
    to      : String,
    item: [{
      name        : String,
      description : String,
      amount      : Number
    }],
    subTotal: String,
    total   : String,
    currency: String,
  });

  InvoiceSchema.pre('save', function(next) {
    var invoice = this;
    invoice.item.forEach(function(data) {
      try {
        delete data.show;
      } catch (e) {

      }
    });
    next();
  });

  module.exports = mongoose.model('Invoice', InvoiceSchema);
}());
