(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );

  exports.putOne = function( req,res, next ) {
    var query = node_module.url.parse( req.url, true ).query;
    node_module.mongoDB.db( node_module, 'erp_moe3' )
    .then(function() {
      node_module.Invoice
      .findById(query.id, function( err, document ) {
        document.date                   = query.date;
        document.invoiceNumber          = query.invoiceNumber;
        document.postalCode             = query.postalCode;
        document.customerFirstName      = query.customerFirstName;
        document.customerLastName       = query.customerLastName;
        document.subject                = query.subject;
        document.salesRepFirstName      = query.salesRepFirstName;
        document.salesRepLastName       = query.salesRepLastName;
        document.salesOfficeAddress1    = query.salesOfficeAddress1;
        document.salesOfficeAddress2    = query.salesOfficeAddress2;
        document.salesOfficeAddress3    = query.salesOfficeAddress3;
        document.salesOfficePhoneNumber = query.salesOfficePhoneNumber;
        document.item = (JSON.parse( query.item ));

        document.save();
      });
    }).then( res.json(200) );
  };
}());
