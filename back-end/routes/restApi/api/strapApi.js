(function() {
  'use strict';

  var express = require('express'),
      app     = express(),
      passport = require('passport'),

      getEmail        = require('../adminApImplementation/strap/getIndex.js'),
      postUserSignUp  = require('../adminApImplementation/strap/postIndex.js'),
      postUserLogIn   = require('../adminApImplementation/strap/postIndex.js'),
      postGoogleLogIn = require('../adminApImplementation/strap/postIndex.js'),
      postFacebookLogin = require('../adminApImplementation/strap/postIndex.js');

    app.route('/isEmailTaken')
      .get(getEmail.isEmailTaken);

    app.route('/userSignUp')
      .post(passport.authenticate('local-register'), postUserSignUp.userSignUp);

    app.route('/userLogIn')
      .post(postUserLogIn.userLogIn);

    app.route('/logInUserGoogle')
      .post(postGoogleLogIn.googleLogin);

    app.route('/logInUserFacebook')
      .post(postFacebookLogin.facebookLogin);

    module.exports = app;
}());
