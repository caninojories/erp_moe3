(function(){
  'use strict';

  var mongo     = require('../../../../configuration/mongodb'),
      ObjectId  = require('mongodb').ObjectID,
      url       = require('url');

  exports.deleteCustomer = function( req, res, next ) {
    var query = url.parse(req.url, true).query;
    mongo.db( 'erp_moe3' )
      .collection( 'customer' )
      .remove({'_id': new ObjectId(query.id.toString())})
      .then(function( customer ) {
        res.json({response: 'success'});
      });
  };
}());
