(function() {
  'use strict';

  var app = io.express(),

      POSTFACEBOOKLOGIN  = require('../apImpl/admin/login/postIndex.js'),
      POSTGOOGLELOGIN    = require('../apImpl/admin/login/postIndex.js'),
      POSTUSERLOGIN      = require('../apImpl/admin/login/postIndex.js');

  app.route('/logInUserFacebook')
    .post(POSTFACEBOOKLOGIN.postFacebookLogin);

  app.route('/logInUserGoogle')
    .post(POSTGOOGLELOGIN.postGoogleLogin);

  app.route('/userLogin')
    .post(io.locaLogin, POSTUSERLOGIN.postUserLogin);

  module.exports = app;
}());
