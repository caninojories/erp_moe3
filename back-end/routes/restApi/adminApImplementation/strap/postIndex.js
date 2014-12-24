(function() {
  'use strict';

  var mongo    = require( '../../../../configuration/mongodb' ),
      User     = require( '../../../../model/User' ),
      config   = require( '../../../../services/config' ),
      jwt      = require( 'jwt-simple' ),
      moment   = require( 'moment' ),
      passport = require( 'passport' ),
      qs       = require( 'querystring' ),
      request  = require( 'request' );

  var module   = app_require( 'services/module.config' );


  exports.userSignUp = function( req, res, next ) {
    createSendToken( req.user, res );
  };

  exports.userLogIn = function( req, res, next ) {
    passport.authenticate('local-login', function(err, user) {
      if( err ) next( err );

      req.login( user, function( err ) {
        if( err ) next( err );

        createSendToken( user, res );
      });
    })(req, res, next );
  };

  exports.googleLogin = function( req, res, next ) {
    var url = 'https://accounts.google.com/o/oauth2/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      code: req.body.code,
      grant_type: 'authorization_code',
      client_secret: 'cj7XlTFoISLGZsBpNktjTjid'
    };
    request.post( url, {
      json: true,
      form: params
    }, function( err, response, token ) {
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };

      request.get({
        url: apiUrl,
        headers: headers,
        json: true
      }, function( err, response, profile ) {
        mongo.db( 'erp_moe3' )
          .then(function( connection ) {
            User.findOne({
              googleId: profile.sub
            }, function( err, foundUser ) {
              if( foundUser ) {
                return createSendToken( foundUser, res );
              } else {
                var newUser = User({
                  googleId: profile.sub,
                  displayName: profile.name
                });
                newUser.save(function(err) {
                  if( err ) return next( err );
                  createSendToken( newUser, res );
                });
              }
            });
          });
      });
    });
  };

  exports.facebookLogin = function( req, res, next ) {
    var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/me';

    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: config.FACEBOOK_SECRET,
      code: req.body.code
    };

    request.post({
      url: accessTokenUrl,
      qs: params,
      json: true
    }, function( err, response, accessToken ) {
      if( err ) throw err;
      accessToken = qs.parse( accessToken );

      request.get({
        url: graphApiUrl,
        qs: accessToken,
        json: true,
      }, function( err, response, profile ) {
        mongo.db( 'erp_moe3' )
          .then(function( connection ) {
            User.findOne({
              facebookId: profile.id.toString() ,
            }, function( err, foundUser ) {
              if( foundUser ) {
                console.log( foundUser );
                return createSendToken( foundUser, res );
              } else {
                var newUser = User({
                  facebookId: profile.id,
                  displayName: profile.name
                });
                newUser.save(function( err ) {
                  createSendToken( newUser, res );
                });
              }
            });
          });
      });
    });
  };

  function createSendToken( user , res ) {
    var payload = {
      sub: user._id.toString(),
      exp: moment().add(10, 'days').unix()
    };

    var token = jwt.encode( payload, 'shhh..');
    return res.status(200).send({
      user: user.toJSON(),
      token: token
    });
  }
}());
