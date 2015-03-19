(function() {
  'use strict';

  var express = require('express'),
  router      = express.Router();

  router.get('/admin/invoice/registration.html', io.authorize, io.xPoweredBy, function(req, res) {
    console.log(req.getLocale());
    app.locals.locale = 'en-US';
    res.setLocale('ja');
    res.__('invoice.registration.heading.Invoice');
    res.__('invoice.registration.heading.Registration');
    res.__('invoice.registration.form.invoice');
    res.__('invoice.registration.form.invoiceDate');
    res.__('invoice.registration.form.terms');
    res.__('invoice.registration.form.dueDate');
    res.__('invoice.registration.from');
    res.__('invoice.registration.to');
    res.__('invoice.registration.personInCharge.name');
    res.__('invoice.registration.personInCharge.firstName');
    res.__('invoice.registration.personInCharge.lastName');
    //res.__('invoice.registration.addItem');
    res.render('admin/invoice/registration.html');
  });

  module.exports = router;
}());
