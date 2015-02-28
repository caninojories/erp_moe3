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
        console.log(result);
        if(!result) {return options.res.json({data:'not found'});}
        options.res.json(result);
      });
  };

  exports.findOneById = function(options) {
    return options.io[options.name]
      .findById(options.find)
      .exec()
      .then(function(result) {
        options.res.json(result);
      });
  };
}());
