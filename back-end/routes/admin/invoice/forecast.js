(function() {
  'use strict';

  var router = io.express.Router();

  router.get('/admin/invoice/forecast.html', function(req, res) {
    res.render('admin/invoice/forecast.html');
  });

  module.exports  = router;
}());
