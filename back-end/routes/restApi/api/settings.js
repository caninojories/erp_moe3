(function() {
  'use strict';

  var app = io.express();

  app.route('/settings/:language')
    .get(io.languageLocale, io.SERVICES().settings);

  module.exports = app;
}());
