(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' ),
      url         = require( 'url' );

  exports.put = function( req, res, next ) {
    var query = url.parse( req.url, true).query;
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        node_module.SalesRep
          .findById(query.id, function( err, document ) {
            document.firstName  = query.firstName;
            document.lastName   = query.lastName;
            document.postalCode = query.postalCode;
            document.salesOfficeAddress1    = query.salesOfficeAdd1;
            document.salesOfficeAddress2    = query.salesOfficeAdd2;
            document.salesOfficeAddress3    = query.salesOfficeAdd3;
            document.salesOfficePhoneNumber = query.salesOfficePhoneNumber;
            document.save();
          }).then( res.json(200) );
      });
  };
}());
