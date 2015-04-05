(function() {
  'use strict';

  var i18n = require('i18n');

  module.exports = function(req, res, next) {
    if (req.headers.language) {
      var lang = req.headers.language.split(' ')[1];
      req.lang = lang;
      res.setLocale(lang);
    }
    next();
  };
}());
