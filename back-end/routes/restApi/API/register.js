(function() {
  'use strict';

  var app = global.io.express(),

      GETEMAILINFO       = require('../adminApImplementation/register/getIndex.js'),
      POSTREGISTERUSER   = require('../adminApImplementation/register/postIndex.js');

  app.route('/userRegister')
    .post(io.passport.authenticate('local-register'), POSTREGISTERUSER.registerUser);

  app.route('/isEmailTaken')
    .get(GETEMAILINFO.getEmail);

  module.exports = app;
}());
