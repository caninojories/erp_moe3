(function() {
  'use strict';

  var mongoose = require('mongoose');

  var InvoiceSchema = new mongoose.Schema({
    number  : String,
    date    : Date,
    terms   : String,
    dueDate : Date,
    from    : String,
    to      : String,
    personInCharge: {
      firstName: String,
      lastName: String
    },
    item: [{
      name        : String,
      description : String,
      amount      : Number
    }],
    subTotal: String,
    tax     : String,
    total   : String,
    currency: String,
    status: {
      type: String,
      default: 'Pending'
    }
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

  InvoiceSchema.methods.findFrom = function (callback) {
    var invoice = this.toObject();
    io.InvoiceFromAddress.findOne({name: invoice.from}, callback);
  };

  InvoiceSchema.methods.findTo = function (callback) {
    var invoice = this.toObject();
    io.InvoiceToAddress.findOne({name: invoice.to}, callback);
  };

  module.exports = mongoose.model('Invoice', InvoiceSchema);
}());
