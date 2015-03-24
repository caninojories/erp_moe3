(function() {
  'use strict';

  var app = io.express();

  app.route('/fromAddress')
    .post(io.INVOICE().fromAddress.post.from);

  app.route('/toAddress')
    .post(io.INVOICE().toAddress.post.to);

  app.route('/fromAddress/typeAhead')
    .get(io.INVOICE().fromAddress.getList.typeAheadfromList);

  app.route('/fromAddress/view/:id')
    .get(io.INVOICE().fromAddress.get.oneFrom);

  app.route('/toAddress/typeAhead')
    .get(io.INVOICE().toAddress.getList.typeAheadToList);

  app.route('/toAddress/view/:id')
    .get(io.INVOICE().toAddress.get.oneTo);

  // app.route('/fromAddress/view/list')
  //   .get(io.INVOICE().fromAddress.getList.fromList);

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

  app.route('/forecast')
    .get(io.INVOICE().get.forecast);

  module.exports = app;
}());
