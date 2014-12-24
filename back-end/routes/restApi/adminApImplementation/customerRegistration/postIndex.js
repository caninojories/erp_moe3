(function() {
  'use strict';

  var mongo = require('../../../../configuration/mongodb'),
      url   = require('url');

  exports.saveCustomer = function( req, res, next ) {
    mongo.db( 'erp_moe3' )
      .collection( 'customer' )
      .insert({firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        position: req.body.position,
        personInCharge: req.body.personInCharge,
        phoneNumber: req.body.phoneNumber,
        postalCode: req.body.postalCode,
        customerAdd1: req.body.customerAdd1,
        customerAdd2: req.body.customerAdd2,
        customerAdd3: req.body.customerAdd3,
        email: req.body.email,
        paymentTerms: req.body.paymentTerms})
      .then(function( response ) {
        res.json( {response: 'success'});
      })
      .catch(function( message ) {
        res.json( {response: message} );
      });
  };
}());
