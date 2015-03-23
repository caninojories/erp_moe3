(function() {
  'use strict';

  var i18n = require('i18n');

  module.exports = function(req, res, next) {
    var lang = req.headers.language.split(' ')[1];
    res.setLocale(lang);

    next();
  };
}());
