(function() {
  'use strict';

  exports.one = function(req, res, next) {
    var options = {
        find: req.params.id,
        io  : io,
        name: 'Invoice',
        res : res
      };

    io.mongoDB(io.config.dbName)
      .then(io.delete.findByIdAndRemove(options));
  };
}());
