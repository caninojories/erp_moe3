(function() {
  'use strict';

  module.exports = function( node_module, params, res ) {
    node_module.request( node_module.config.GOOGLE_ACESS_TOKEN_URL, {
      form: params,
      json: true,
      method: 'POST'
    }).then(function( token, handleError ) {
      // console.log( accessToken );
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };
      return node_module.request({
        url: node_module.config.GOOGLE_API_URL,
        headers: headers,
        json: true,
        method: 'GET'
      });
    }).then(function( profile, handleError ) {
      node_module.mongoDB.db( 'erp_moe3' );
      return profile;
    }).then(function( googleData ) {
      node_module.User.findOne({
        googleId: googleData.sub
      }, findUser );

      function findUser( err, foundUser ) {
        if( foundUser ) {
          node_module.createSendToken( node_module, foundUser, res );
        } else {
          var newUser = node_module.User({
            googleId: googleData.sub,
            displayName: googleData.name
          });
          newUser.save(function( err ) {
            node_module.createSendToken( node_module, newUser, res );
          });
        }
      }
    });
  };
}());
