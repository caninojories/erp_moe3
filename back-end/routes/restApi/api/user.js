(function() {
  'use strict';

  var app = io.express();

  app.route('/userCredentials')
    .get(io.SERVICES().user);

  module.exports = app;
}());
