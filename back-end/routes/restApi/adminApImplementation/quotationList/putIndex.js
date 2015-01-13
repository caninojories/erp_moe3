(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );
  var _ = require('underscore');

  exports.putOne = function( req,res, next ) {
    var query = node_module.url.parse( req.url, true ).query;
    node_module.mongoDB.db( node_module, 'erp_moe3' )
    .then(function() {
      node_module.Quotation
      .findById(query.id, function( err, document ) {
        if( query.key === 'item' ) document.item =  (JSON.parse( query.value ));
        else document[query.key] = query.value;

        document.save();
      });
    }).then( res.json(true) );
  };
}());
