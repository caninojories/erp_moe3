(function() {
  'use strict';

  var mongo = require('../../../../configuration/mongodb'),
      User  = require( '../../../../model/User' ),
      url   = require('url');

  exports.isEmailTaken = function( req, res, next ) {
    var query = url.parse( req.url, true ).query;

    mongo.db( 'erp_moe3' )
      .then(function( connection ) {
        User.findOne({email: query.email}, function( err, user ) {
          if( err ) throw err;
          if( user ) return res.status(201).send( user );
          res.status(201).send( user );
        });
      });
  };
}());
