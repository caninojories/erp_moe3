(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' ),
      ObjectId  = require('mongodb').ObjectID,
      url         = require( 'url' );

  exports.delete = function( req, res, next ) {
    var query = url.parse(req.url, true).query;
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        node_module.SalesRep
          .findByIdAndRemove( query.id, callBack );

          function callBack( err, document) {
            if (err) next(err);
            res.json( 200, document );
          }
      });
  };
}());
