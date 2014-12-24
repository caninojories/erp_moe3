(function() {
  'use strict';

  module.exports = function( req, res, next ) {
    var accessToken = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.me';

    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: config.FACEBOOK_SECRET,
      code: req.body.code
    };
  };
}());
