(function() {
  'use strict';

  var mongo = require('../../../../configuration/mongodb'),
  url   = require('url');

  exports.getSalesRepresentativeList = function ( req, res, next ) {
    mongo.db( 'erp_moe3' )
      .collection( 'salesRepresentative' )
      .find({})
      .sort({firstName: -1})
      .toArray()
      .then(function( salesRepresentativeList ) {
        console.log( salesRepresentativeList );
        res.json( salesRepresentativeList );
      });
    };
    
  })();
