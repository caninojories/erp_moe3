(function() {
  'use strict';

  var io  = appRequire('services/module.config'),
      app = io.express(),

      FACEBOOKLOGIN = require('../adminApImplementation/signin/postIndex.js');

  app.route('/facebookLogin')
    .post(FACEBOOKLOGIN.facebookLogin);
}());
