(function() {
  'use strict';

  module.exports = function (dbName) {
    if (io.mongoose.connection.readyState === 0) {
      console.log('mongolab uri');
      console.log(process.env.MONGOLAB_URI);
      return io.mongoose.connectAsync(process.env.MONGOLAB_URI || dbName);
    } else {
      return io.mongoose.disconnectAsync(function() {
        io.mongoose.connection.close(function() {
          io.mongoose.connectAsync(process.env.MONGOLAB_URI || dbName);
        });
      });
    }
  };
}());
