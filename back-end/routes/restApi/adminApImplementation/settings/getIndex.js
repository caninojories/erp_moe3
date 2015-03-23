(function() {
  'use strict';

  exports.language = function(req, res, next) {
    res.json({language: req.params.language});
  };
}());
