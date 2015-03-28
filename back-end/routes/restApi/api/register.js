(function() {
  'use strict';

  var app = io.express(),

      GETEMAILINFO       = require('../adminApImplementation/register/getIndex.js'),
      POSTREGISTERUSER   = require('../adminApImplementation/register/postIndex.js');

  app.route('/userRegister')
    .post(io.preRegister, POSTREGISTERUSER.registerUser);

  app.route('/isEmailTaken')
    .get(GETEMAILINFO.getEmail);

  module.exports = app;
}());
