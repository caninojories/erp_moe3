(function() {
  'use strict';

  module.exports = function(io, params, res) {
    io.request({
      url: io.config.FACEBOOK_ACCESS_TOKEN_URL,
      qs: params,
      json: true,
      method: 'POST'
    }).then(function(accessToken, handleError) {
      accessToken = io.qs.parse(accessToken);
      return io.request({
        url: io.config.FACEBOOK_GRAPHAPI_URL,
        qs: accessToken,
        json: true,
        Method: 'GET'
      });
    }).then(function(profile, handleError) {
      io.mongoDB(io, io.config.dbName);
      return profile;
    }).then(function(facebookData) {
      io.User.findOne({
        facebookId: facebookData.id.toString()
      }, findUser);

      function findUser(err, foundUser) {
        if (foundUser) {
          io.createSendToken(io, foundUser, res);
        } else {
          var newUser = io.User({
            facebookId: facebookData.id,
            displayName: facebookData.name
          });
          newUser.save(function(err) {
            io.createSendToken(io, newUser, res);
          });
        }
      }
    });
  };
}());
