(function() {
  'use strict';
  var i18n = require('i18n');

  module.exports = function(req, res, next) {
    i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['en', 'ja'],

    // where to store json files - defaults to './locales' relative to modules directory
    directory: __dirname + '/locales',

    defaultLocale: 'en',

    // sets a custom cookie name to parse locale settings from  - defaults to NULL
    cookie: 'lang',
    objectNotation: true
    });

    i18n.init(req, res);
    //res.locals('__', res.__);

    var current_locale = i18n.getLocale();

    return next();
  };
}());
