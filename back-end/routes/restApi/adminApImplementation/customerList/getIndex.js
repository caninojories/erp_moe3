(function() {
  'use strict';

  var mongo = require('../../../../configuration/mongodb'),
      url   = require('url');

  exports.getCustomerList = function( req, res, next ) {
    mongo.db( 'erp_moe3' )
      .collection( 'customer' )
      .find({})
      .sort({firstName: -1})
      .toArray()
      .then(function( customerList ) {
        res.json( customerList );
      })
      .catch(function( message ) {
        res.json( {response: message} );
      });
  };
}());
