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
}());
