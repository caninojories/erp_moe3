(function() {
  'use strict';

  var app = io.express();

  app.route('/invoiceFromAddress')
    .get(io.INVOICE().fromAddress.getList.from)
    .post(io.INVOICE().fromAddress.post.from);

  app.route('/invoiceFromAddress/view/:companyName')
    .get(io.INVOICE().fromAddress.get.oneFrom);

  app.route('/invoiceToAddress')
    .get(io.INVOICE().toAddress.getList.to)
    .post(io.INVOICE().toAddress.post.to);

  app.route('/invoiceToAddress/view/:companyName')
    .get(io.INVOICE().toAddress.get.oneTo);

  module.exports = app;
}());
