(function() {
  'use strict';

  module.exports = function( node_module, params, res ) {
    node_module.request({
      url: node_module.config.FACEBOOK_ACCESS_TOKEN_URL,
      qs: params,
      json: true,
      method: 'POST'
    }).then(function( accessToken, handleError ) {
      accessToken = node_module.qs.parse( accessToken );
      return node_module.request({
        url: node_module.config.FACEBOOK_GRAPHAPI_URL,
        qs: accessToken,
        json: true,
        Method: 'GET'
      });
    }).then(function( profile, handleError ) {
      node_module.mongoDB.db( node_module, 'erp_moe3' );
      return profile;
    }).then(function( facebookData ) {
      node_module.User.findOne({
        facebookId: facebookData.id.toString()
      }, findUser );

      function findUser( err, foundUser ) {
        if( foundUser ) {
          node_module.createSendToken( node_module, foundUser, res );
        } else {
          var newUser = node_module.User({
            facebookId: facebookData.id,
            displayName: facebookData.name
          });
          newUser.save(function( err ) {
            node_module.createSendToken( node_module, newUser, res );
          });
        }
      }
    });
  };
}());
