(function() {
  'use strict';

  var router = io.express.Router();

  router.get('/admin/invoice/toAddressViewList.html', io.authorize, io.xPoweredBy, io.languageLocale, function(req, res) {
    res.render('admin/invoice/toAddressViewList.html');
  });

  module.exports = router;
}());
