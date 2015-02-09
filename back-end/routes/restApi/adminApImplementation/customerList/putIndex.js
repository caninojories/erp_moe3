(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );

  exports.putOne = function( req,res, next ) {
    var query = node_module.url.parse( req.url, true ).query;
    node_module.mongoDB.db( node_module, 'erp_moe3' )
    .then(function() {
      node_module.Customer
      .findById(query.id, function( err, document ) {
        document.firstName      = query.firstName;
        document.lastName       = query.lastName;
        document.department     = query.department;
        document.position       = query.position;
        document.personInCharge = query.personInCharge;
        document.phoneNumber    = query.phoneNumber;
        document.postalCode     = query.postalCode;
        document.customerAdd1   = query.customerAdd1;
        document.customerAdd2   = query.customerAdd2;
        document.customerAdd3   = query.customerAdd3;
        document.email          = query.email;
        document.paymentTerms   = query.paymentTerms;

        document.save();
      });
    }).then( res.json(200) );
  };
}());
