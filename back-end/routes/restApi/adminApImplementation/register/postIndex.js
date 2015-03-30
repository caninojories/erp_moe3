(function() {
  'use strict';

  exports.registerUser = function(req, res, next) {
    global.io.createSendToken(io, req.user, res);
  };

}());
