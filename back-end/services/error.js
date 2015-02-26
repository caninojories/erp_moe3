(function() {
  'use strict';

  module.exports = function(error, value) {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log(value);
    }
  };
}());
