(function() {
  'use strict';

  exports.putById = function(options) {
    return io[options.name]
      .findById(options.find)
      .exec()
      .then(details)
      .then(function(result) {
        result.save(function(err, result) {
          if (err) {return;}
          options.res.json(result);
        });
      });

      function details(result) {
        for (var obj in options.details) {
          if (options.details.hasOwnProperty(obj)) {
            result[obj] = options.query[obj];
          }
        }
        return result;
      }
  };

  exports.putByIdParent = function(options) {
    return io[options.name]
      .findById(options.find)
      .exec()
      .then(details)
      .then(function(result) {
        result.save(function(err, result) {
          return result;
        });
      });

    function details(result) {
      for (var obj in options.details) {
        if (options.query[obj].indexOf('[') !== 0) {
          result[obj] = options.query[obj];
        }
      }
      return result;
    }
  };

  exports.putByIdChildren = function(options) {
    return io[options.name]
      .findById(options.find)
      .exec()
      .then(itemDetails)
      .then(function(result) {
        result.save(function(err, result) {
          options.res.json(result);
        });
      });

    function itemDetails(result) {
      for (var obj in options.details) {
        if (options.query[obj].indexOf('[') === 0) {
          var itemList = JSON.parse(options.query[obj]);
          for (var i = 0; i < itemList.length; i++) {
            if (itemList[i]._id) {
              if (result[obj][i]._id.toString() === itemList[i]._id) {
                optionsItemDetails(options.itemDetails, result[obj], itemList, i);
              }
            } else {
              var create = result[obj].create(itemList[i]);
              result[obj].push(create);
            }
          }
          return result;
        }
      }
    }

    function optionsItemDetails(itemDetails, result, itemList, i) {
      for (var item in itemDetails) {
        if (itemDetails.hasOwnProperty(item)) {
          result[i][item] = itemList[i][item];
        }
      }
    }
  };
}());
