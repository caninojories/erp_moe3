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
          if( options.details.hasOwnProperty(obj)) {
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
      for(var obj in options.details) {
        if(options.query[obj].indexOf('[') !== 0) {
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
      for(var obj in options.details) {
        if(options.query[obj].indexOf('[') === 0) {
          var itemList = JSON.parse(options.query[obj]);
          for(var i = 0; i < itemList.length; i++) {
            if(itemList[i]._id) {
              if(result[obj][i]._id.toString() === itemList[i]._id) {
                for(var item in options.itemDetails) {
                  result[obj][i][item] = itemList[i][item];
                }
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
  };
}());
