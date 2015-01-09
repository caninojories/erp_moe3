(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );

  exports.deleteOne = function( req, res, next ) {
    var query = node_module.url.parse( req.url, true ).query;
    console.log( query.id );
    console.log( 'jories' );
    node_module.mongoDB.db( node_module, 'erp_moe3' )
    .then(function() {
      node_module.Quotation
      .findByIdAndRemove( query.id, callBack );

      function callBack( err, document) {
        if (err) next(err);
        res.json( 200, document );
      }
    });
  };
}());
