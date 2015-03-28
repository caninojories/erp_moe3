(function() {
  'use strict';

  exports.findList = function(options) {
    return io[options.name]
      .find(options.find || {})
      .sort(options.sort || {})
      .exec()
      .then(function(result) {
        options.res.status(200).send(result);
      });
  };

  exports.findOne = function(options) {
    return io[options.name]
      .findOne(options.find)
      .exec()
      .then(function(result) {
        if(!result) {
          return options.res.json(404, {
            message: 'Check Email',
            status: 404
          });
        }
        options.res.json({message: 'Check Mail', status: 200, data: result});
      });
  };

  exports.findById = function(options) {
    return io[options.name]
      .findById(io.ObjectId(options.find))
      .exec()
      .then(function(result) {
        /* invoice FindById */
        if(options.merge) {
          result[options.merge.findFrom](function(err, from) {
            var fromObj = from.toJSON();
            result[options.merge.findTo](function(err, to) {
              var toObj = to;
              options.res.json({data:result, from: fromObj, to: toObj});
            });
          });
        } else {
          options.res.json(result);
        }
      });
  };
}());
