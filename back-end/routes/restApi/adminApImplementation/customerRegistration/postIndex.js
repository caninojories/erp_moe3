(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );

  exports.post = function( req, res, next ) {
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        var customer = node_module.Customer({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          position: req.body.position,
          personInCharge: req.body.personInCharge,
          phoneNumber: req.body.phoneNumber,
          postalCode: req.body.postalCode,
          customerAdd1: req.body.customerAdd1,
          customerAdd2: req.body.customerAdd2,
          customerAdd3: req.body.customerAdd3,
          email: req.body.email,
          paymentTerms: req.body.paymentTerms
        });
        return customer;
      }).then(function( customer, handleEerror ) {
        customer.save(function( err ) {
          if( err ) next( err );

          res.status(200).send(customer);
        });
      });
  };
}());
