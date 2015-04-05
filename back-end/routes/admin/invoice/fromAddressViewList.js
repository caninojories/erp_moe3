(function() {
  'use strict';

  var router = io.express.Router();

  router.get('/admin/invoice/fromAddressViewList.html', io.xPoweredBy, io.languageLocale, io.authorize,
    function(req, res) {
      res.render('admin/invoice/fromAddressViewList.html');
    });

  module.exports = router;
}());
