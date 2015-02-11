(function() {
  'use strict';

  var node_module = appRequire( 'services/module.config' );

  exports.userSignUp = function( req, res, next ) {
    console.log('userSignUP');
    node_module.createSendToken( node_module, req.user, res );
  };

  exports.userLogIn = function( req, res, next ) {
    node_module.passport.authenticate('local-login', function(err, user) {
      if( err ) next( err );

      req.login( user, function( err ) {
        if( err ) return next( err );
        node_module.createSendToken( node_module, user, res );
      });
    })(req, res, next );
  };

  exports.googleLogin = function( req, res, next ) {
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      code: req.body.code,
      grant_type: 'authorization_code',
      client_secret: node_module.config.GOOGLE_SECRET,
    };

    node_module.googleAuth( node_module, params, res );
  };

  exports.facebookLogin = function( req, res, next ) {
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: node_module.config.FACEBOOK_SECRET,
      code: req.body.code
    };

    node_module.facebookAuth( node_module, params, res );
  };
}());
