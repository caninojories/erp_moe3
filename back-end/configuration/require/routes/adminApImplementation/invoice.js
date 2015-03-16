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
      },
      get       : require(adminImplementation + 'getIndex'),
      getList   : require(adminImplementation + 'getIndex'),
      post      : require(adminImplementation + 'postIndex'),
      update    : require(adminImplementation + 'putIndex'),
      delete    : require(adminImplementation + 'deleteIndex'),
      pdf       : require(adminImplementation + 'getIndex')
    };

    return config;
  };
}());
