(function() {
  'use strict';

  module.exports = function() {
    var adminImplementation =  global.io.rootPath + 'back-end/routes/restApi/adminApImplementation/settings/';
    var config = {
      get   : require(adminImplementation + 'getIndex')
    };

    return config;
  };
}());
