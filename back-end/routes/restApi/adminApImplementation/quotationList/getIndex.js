(function() {
  'use strict';

  var node_module = app_require('services/module.config');

  exports.getList = function( req, res, next ) {
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        node_module.Quotation
          .find()
          // .sort({firstName: 1})
          .exec( documents );

          function documents( handleError, documentList ) {
            if( handleError ) next( handleError );
            res.status(200).send( documentList );
          }
      });
  };

  exports.getOne = function( req, res, next ) {
    console.log( 'jories' );
    var query = node_module.url.parse( req.url, true ).query;
    console.log( query );
    node_module.mongoDB.db( node_module, 'erp_moe3' )
    .then(function() {
      node_module.Quotation
      .findById( query.id,  callBack );
      function callBack( err, document) {
        if (err) next(err);
        res.json( 200, document );
      }
    });
  };
}());
