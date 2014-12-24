(function(){
  'use strict';

  var mongo     = require('../../../../configuration/mongodb'),
      ObjectId  = require('mongodb').ObjectID,
      url       = require('url');

  exports.updateCustomerInformation = function( req, res, next ) {
    var query = url.parse(req.url, true).query;
    console.log( query );
    mongo.db( 'erp_moe3' )
      .collection( 'customer' )
      .update({'_id': new ObjectId(query.id)},
        {firstName: query.firstName,
        lastName: query.lastName,
        department: query.department,
        position: query.position,
        personInCharge: query.personInCharge,
        phoneNumber: query.phoneNumber,
        postalCode: query.postalCode,
        customerAdd1: query.customerAdd1,
        customerAdd2: query.customerAdd2,
        customerAdd3: query.customerAdd3,
        email: query.email,
        paymentTerms: query.paymentTerms})
      .then(function( customer ) {
        res.json({response: 'success'});
      })
      .catch(function( message ) {
        console.log( 'catch error in updating the customer');
        res.json( message );
      });
  };
}());
