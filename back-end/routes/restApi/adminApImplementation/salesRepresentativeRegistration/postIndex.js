(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );

  exports.saveSalesRepresentative = function( req, res, next ) {
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        var salesRep = node_module.SalesRep({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          postalCode: req.body.postalCode,
          salesOfficeAddress1: req.body.salesOfficeAdd1,
          salesOfficeAddress2: req.body.salesOfficeAdd2 || null,
          salesOfficeAddress3: req.body.salesOfficeAdd3 || null,
          salesOfficePhoneNumber: req.body.salesOfficePhoneNumber
        });
        return salesRep;
      }).then(function( salesRepresentative ) {
        salesRepresentative.save(function( err ) {
          if( err ) next( err );

          res.status(200).send({
            response: 'success'
          });
        });
      });

    //
    // .collection( 'salesRepresentative' )
    // .insert({firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   postalCode: req.body.postalCode,
    //   salesOfficeAddress1: req.body.salesOfficeAdd1,
    //   salesOfficeAddress2: req.body.salesOfficeAdd2,
    //   salesOfficeAddress3: req.body.salesOfficeAdd3,
    //   salesOfficePhoneNumber: req.body.salesOfficePhoneNumber})
    // .then( function( document) {
    //   res.json({response: 'success'});
    // });
  };
}());
