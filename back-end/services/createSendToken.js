(function() {
  'use strict';

  module.exports = function createSendToken( node_module, user , res ) {
    var payload = {
      sub: user._id.toString(),
      exp: node_module.moment().add(10, 'days').unix()
    };

    var token = node_module.jwt.encode( payload, 'shhh..');
    return res.status(200).send({
      user: user.toJSON(),
      token: token
    });
  };
}());
