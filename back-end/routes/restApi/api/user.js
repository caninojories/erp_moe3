(function() {
  'use strict';

  var app = io.express();

  app.route('/userCredentials')
    .post(io.USER().get.one);

  module.exports = app;
}());
