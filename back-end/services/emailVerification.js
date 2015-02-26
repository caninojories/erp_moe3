(function() {
  'use strict';

  var _ = require('underscore');
  var fs = require('fs');

  var model = {
    verifyUrl: 'http://localhost/userApi/verifyEmail?token=',
    title: 'erp_moe3',
    subTitle: 'Thanks for Signing up!.',
    body: 'Please verify your email address by clicking the button below'
  };

  module.exports = function(node_module, email) {
    var payLoad = {
      sub: email
    };

    var token = node_module.jwt.encode(payLoad, node_module.config.EMAIL_SECRET);
    var transporter = node_module.nodemailer.createTransport(node_module.nodeSmtp({
      host: 'localhost'
    }));
  };

  function getHtml(token) {
    var path = '../front-end/views/commons/emailVerification.html';
    var html = fs.readFileSync(path, 'utf8');

    var template = _.template(html);

    model.verifyUrl += token;

    return template(model);
  }

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
}());
