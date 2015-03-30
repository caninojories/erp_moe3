(function() {
  'use strict';

  module.exports = function() {
    var service =  io.rootPath + 'back-end/routes/restApi/services/user/';
    var config = {
      get   : require(service + 'getIndex')
    };

    return config;
  };
}());
