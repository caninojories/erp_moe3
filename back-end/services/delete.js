(function() {
  'use strict';

  exports.findByIdAndRemove = function(options) {
    return io[options.name]
      .findByIdAndRemove(options.find)
      .exec()
      .then(function(result) {
        options.res.status(200).send(result);
      });
  };

}());
