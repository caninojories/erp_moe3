(function() {
  'use strict';

  var node_module = app_require('services/module.config');

  exports.getList = function( req, res, next ) {
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        node_module.Customer
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
    var query = node_module.url.parse( req.url, true ).query;
    node_module.mongoDB.db( node_module, 'erp_moe3' )
    .then(function() {
      node_module.Customer
        .findById( query.id,  callBack );
        function callBack( err, document) {
          if (err) next(err);
          res.json( 200, document );
        }
    });
  };
}());
