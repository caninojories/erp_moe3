(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );

  exports.post = function( req, res, next ) {
    console.log( req.body.title );

    node_module.mongoDB.db( node_module, 'erp_moe3' )
      .then(function() {
        var quotation = node_module.Quotation({
          date: req.body.date || null,
          department: req.body.department || null,
          postalCode: req.body.postalCode || null,
          salesRepFirstName: req.body.salesRepFirstName || null,
          salesRepLastName : req.body.salesRepLastName || null,
          salesOfficeAddress1: req.body.salesOfficeAddress1 || null,
          salesOfficeAddress2: req.body.salesOfficeAddress2 || null,
          salesOfficeAddress3: req.body.salesOfficeAddress3 || null,
          salesOfficePhoneNumber: req.body.salesOfficePhoneNumber || null,
          customerFirstName: req.body.customerFirstName || null,
          customerLastName: req.body.customerLastName || null,
          title: req.body.title || 'item',
          quantity: req.body.quotationObj.quantity || null,
          unitPrice: req.body.quotationObj.unitPrice || null,
          amount: req.body.quotationObj.amount || null,
          status: req.body.quotationObj.status || null,
          condition: req.body.quotationObj.condition || null,
          remark: req.body.quotationObj.remark || null,
          salesProgress: req.body.quotationObj.salesProgress || null,
          spot: req.body.quotationObj.SPOT || null,
          noteForQuotation: req.body.quotationObj.noteForQuotation || null,
          comment: req.body.quotationObj.comment || null,
          note: req.body.quotationObj.note || null
        });
      return quotation;
    }).then(function( quotation, handleError ) {
      quotation.save(function( err ) {
        if( err ) next( err );
        res.status(200).send( quotation );
      });
    });
  };
}());
