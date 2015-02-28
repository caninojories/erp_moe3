(function() {
  'use strict';

  module.exports = function() {
    var adminImplementation =  global.io.rootPath + 'back-end/routes/restApi/adminApImplementation/invoice/';
    var config = {
      fromAddress : {
        get     : require(adminImplementation + 'getIndex'),
        getList : require(adminImplementation + 'getIndex'),
        post    : require(adminImplementation + 'postIndex')
      },
      toAddress   : {
        get     : require(adminImplementation + 'getIndex'),
        getList : require(adminImplementation + 'getIndex'),
        post    : require(adminImplementation + 'postIndex')
      }
    };

    return config;
  };
}());
