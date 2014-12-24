(function() {
  'use strict';

  var mongo = require('../../../../configuration/mongodb'),
      url   = require('url');

  exports.saveSalesRepresentative = function ( req, res, next ) {
    mongo.db( 'erp_moe3' )
    .collection( 'salesRepresentative' )
    .insert({firstName: req.body.firstName,
      lastName: req.body.lastName,
      postalCode: req.body.postalCode,
      salesOfficeAddress1: req.body.salesOfficeAdd1,
      salesOfficeAddress2: req.body.salesOfficeAdd2,
      salesOfficeAddress3: req.body.salesOfficeAdd3,
      salesOfficePhoneNumber: req.body.salesOfficePhoneNumber})
    .then( function( document) {
      res.json({response: 'success'});
    });
  };
}());
