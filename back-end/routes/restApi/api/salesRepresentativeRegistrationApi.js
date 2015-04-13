(function() {
  'use strict';

    var app = io.express();

    app.route('/registration')
      .post(io.SALESREPRESENTATIVE().post.one);

    module.exports = app;
}());
