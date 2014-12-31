(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' ),
      url         = require('url');

  exports.isEmailTaken = function( req, res, next ) {
    var query = url.parse( req.url, true ).query;

    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function( connection ) {
        node_module.User.findOne({email: query.email}, function( err, user ) {
          if( err ) throw err;
          if( user ) return res.status(201).send( user );
          res.status(201).send( user );
        });
      });
  };
}());
