(function() {
  'use strict';

  module.exports = function createSendToken(node_module, user , res) {
    // if (!user) return res.status(500);
    var payload = {
      sub: user._id.toString(),
      exp: node_module.moment().add(5, 'days').unix()
    };

    var token = node_module.jwt.encode(payload, 'shhh..');
    return res.status(200).send({
      message: 'User Token Upon Log-in',
      status : 200,
      user: user.toJSON(),
      token: token
    });
  };
}());
