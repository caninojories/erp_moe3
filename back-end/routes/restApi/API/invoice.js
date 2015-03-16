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

  app.route('/registration')
    .post(io.INVOICE().post.one);

  app.route('/view/list')
    .get(io.INVOICE().getList.list);

  app.route('/view/:id')
    .get(io.INVOICE().get.one)
    .put(io.INVOICE().update.status)
    .delete(io.INVOICE().delete.one);

  app.route('/update/:id')
    .put(io.INVOICE().update.one);

  app.route('/download/pdf')
    .get(io.INVOICE().get.pdf);

  module.exports = app;
}());
