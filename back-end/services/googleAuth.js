(function() {
  'use strict';

  module.exports = function( io, params, res ) {
    io.request( io.config.GOOGLE_ACESS_TOKEN_URL, {
      form: params,
      json: true,
      method: 'POST'
    }).then(function( token, handleError ) {
      // console.log( accessToken );
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };
      return io.request({
        url: io.config.GOOGLE_API_URL,
        headers: headers,
        json: true,
        method: 'GET'
      });
    }).then(function( profile, handleError ) {
      io.mongoDB(io, io.config.dbName);
      return profile;
    }).then(function( googleData ) {
      io.User.findOne({
        googleId: googleData.sub
      }, findUser );

      function findUser( err, foundUser ) {
        if( foundUser ) {
          io.createSendToken( io, foundUser, res );
        } else {
          var newUser = io.User({
            googleId: googleData.sub,
            displayName: googleData.name
          });
          newUser.save(function( err ) {
            io.createSendToken( io, newUser, res );
          });
        }
      }
    });
  };
}());
