(function() {
  'use strict';

  exports.putById = function(options) {
    return options.io[options.name]
      .findById(options.find)
      .exec()
      .then(function(result) {
        for (var obj in options.details) {
          result[obj] = options.query[obj];
        }
        result.save();
      })
      .then(function() {
        options.res.json('success');
      });
  };
}());
