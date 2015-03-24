(function() {
  'use strict';

  var router = io.express.Router();

  router.get('/admin/invoice/fromAddressViewList.html', io.authorize, io.xPoweredBy, io.languageLocale, function(req, res) {
    res.render('admin/invoice/fromAddressViewList.html');
  });

  module.exports = router;
}());
