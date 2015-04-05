(function() {
  'use strict';

  var router = io.express.Router();

  router.get('/admin/invoice/toAddressViewList.html', io.xPoweredBy, io.languageLocale, io.authorize,
    function(req, res) {
      res.render('admin/invoice/toAddressViewList.html');
    });

  module.exports = router;
}());
