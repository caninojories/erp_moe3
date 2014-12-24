(function() {
  'use strict';

  var mongo = require('../../../../configuration/mongodb'),
      ObjectId  = require('mongodb').ObjectID,
      url   = require('url');

  exports.getCustomerInformation = function( req, res, next ) {
    var query = url.parse(req.url, true).query;
    mongo.db('erp_moe3')
      .collection( 'customer' )
      .findOne({'_id': new ObjectId(query.id.toString())})
      .then(function( customer ) {
        res.json( customer );
      });
  };
}());
