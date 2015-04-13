(function() {
  'use strict';

  module.exports = function() {
    var adminImplementation =  global.io.rootPath + 'back-end/routes/restApi/apImpl/admin/salesRepresentative/';

    var config = {
      post      : require(adminImplementation + 'postIndex'),
    };
    return config;
  };
}());
