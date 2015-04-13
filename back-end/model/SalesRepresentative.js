(function() {
  'use strict';

  var mongoose = require('mongoose');

  var SalesRepresentativeSchema = new mongoose.Schema({
    firstName   : String,
    lastName    : String,
    phoneNumber : String,
    address     : String,
    city        : String,
    postalCode  : String
  });

  module.exports = mongoose.model('SalesRepresentative', SalesRepresentativeSchema);
}());
