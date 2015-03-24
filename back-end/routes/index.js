(function() {
  'use strict';

  var express = require('express'),
  router  = express.Router();

  router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

  router.get('/', io.xPoweredBy, io.languageLocale, function(req, res, next) {
    res.render('index.html');
  });

  module.exports = router;
})();
