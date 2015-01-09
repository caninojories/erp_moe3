(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );
  var moment      = require( 'moment' );

  exports.post = function( req, res, next ) {
    var date = moment( req.body.date ).format('LL');
    console.log( date );
    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        var quotation = node_module.Quotation({
          date: req.body.date || '',
          department: req.body.department || '',
          postalCode: req.body.postalCode || '',
          salesRepFirstName: req.body.salesRepFirstName || '',
          salesRepLastName : req.body.salesRepLastName || '',
          salesOfficeAddress1: req.body.salesOfficeAddress1 || '',
          salesOfficeAddress2: req.body.salesOfficeAddress2 || '',
          salesOfficeAddress3: req.body.salesOfficeAddress3 || '',
          salesOfficePhoneNumber: req.body.salesOfficePhoneNumber || '',
          customerFirstName: req.body.customerFirstName || '',
          customerLastName: req.body.customerLastName || '',
          subject: req.body.subject || '',
          item: req.body.quotationObj
        });
      return quotation;
    }).then(function( quotation, handleError ) {
      quotation.save(function( err ) {
        if( err ) next( err );
        res.status( 200 ).send( quotation );
      });
    });
  };
}());
