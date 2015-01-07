(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' ),
      url         = require( 'url' );

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
  };

  exports.getOne = function( req, res, next ) {
    var query = url.parse(req.url, true).query;
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        node_module.SalesRep
          .findById( query.id,  callBack );
          function callBack( err, document) {
            if (err) next(err);
            res.json( 200, document );
          }
      });
  };
  })();
