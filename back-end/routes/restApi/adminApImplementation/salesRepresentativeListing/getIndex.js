(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );

  exports.getSalesRepresentativeList = function ( req, res, next ) {
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        return node_module.SalesRep
          .find()
          .sort({firstName: 1})
          .exec( documents );
        function documents( handleError , documentList ) {
          if( handleError ) next( handleError );
          res.status(200).send( documentList );
        }
      });
    // mongo.db( 'erp_moe3' )
    //   .collection( 'salesRepresentative' )
    //   .find({})
    //   .sort({firstName: -1})
    //   .toArray()
    //   .then(function( salesRepresentativeList ) {
    //     console.log( salesRepresentativeList );
    //     res.json( salesRepresentativeList );
    //   });
    // };
  };
  })();
