(function() {
  'use strict';

  var app = io.express(),

      GETEMAILINFO       = require('../apImpl/admin/register/getIndex.js'),
      POSTREGISTERUSER   = require('../apImpl/admin/register/postIndex.js');

  app.route('/userRegister')
    .post(io.preRegister, POSTREGISTERUSER.registerUser);

  app.route('/isEmailTaken')
    .get(GETEMAILINFO.getEmail);

  module.exports = app;
}());
