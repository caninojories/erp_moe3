(function() {
  'use strict';

  var app = io.express();

  app.route('/:language')
    .get(io.languageLocale, io.SETTINGS().get.language);

  module.exports = app;
}());
