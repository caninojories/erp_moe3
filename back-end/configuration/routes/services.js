(function() {
  'use strict';

  module.exports = function() {
    var service =  global.io.rootPath + 'back-end/routes/restApi/apImpl/services/';
    var config = {
      settings  : require(service + 'settings'),
      user      : require(service + 'user')
    };

    return config;
  };
}());
