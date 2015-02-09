(function() {
  'use strict';

  module.exports = function ( node_module, dbName ) {
    if( node_module.mongoose.connection.readyState === 0 ) {
      return node_module.mongoose.connectAsync(dbName);
    } else {
      return node_module.mongoose.disconnectAsync();
    }
  };

}());
