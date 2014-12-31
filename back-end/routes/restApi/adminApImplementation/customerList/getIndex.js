(function() {
  'use strict';

  var node_module = app_require('services/module.config');

  exports.getCustomerList = function( req, res, next ) {
    node_module.mongoDB.db( 'erp_moe3' )
      .then( );
    // mongo.db( 'erp_moe3' )
    //   .collection( 'customer' )
    //   .find({})
    //   .sort({firstName: -1})
    //   .toArray()
    //   .then(function( customerList ) {
    //     res.json( customerList );
    //   })
    //   .catch(function( message ) {
    //     res.json( {response: message} );
    //   });
  };
}());
