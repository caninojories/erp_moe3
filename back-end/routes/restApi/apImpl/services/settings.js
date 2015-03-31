(function() {
  'use strict';

  module.exports = function(req, res, next) {
    res.json({language: req.lang});
  };
}());
