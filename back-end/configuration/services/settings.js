(function() {
  'use strict';

  module.exports = function() {
    var service =  global.io.rootPath + 'back-end/routes/restApi/services/';
    var config = {
      get   : require(adminImplementation + 'getIndex')
    };

    return config;
  };
}());
