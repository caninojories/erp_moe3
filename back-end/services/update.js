(function() {
  'use strict';

  exports.putById = function(options) {
    return options.io[options.name]
      .findById(options.find)
      .exec()
      .then(function(result) {
        for (var obj in options.details) {
          var data,
              isArray = false,
              itemLength = 1;
          if(obj === 'item') {
            if(typeof options.query[obj] === 'object') {
              isArray = true;
              itemLength = options.query[obj].length;
            } else {
              /*Object Literal Response from the client*/
              data = JSON.parse(options.query[obj]);
              isArray = true;
            }
          } else {
            result[obj] = options.query[obj];
          }
          if (isArray) {
            for (var i = 0; i < itemLength; i++) {
              if (options.query[obj] instanceof Array) {
                var counter = 0;
                /*Item data is more than one*/
                data = JSON.parse(options.query[obj][i]);
                for (var items in options.io.config.invoice) {
                  if ((result[obj].length - 1) >= i) {
                    result[obj][i][items] = data[items];
                  } else {
                    if (counter === 0) {
                      var create = result[obj].create(data);
                      result[obj].push(create);
                      counter = counter + 1;
                    }
                  }
                }
              } else {
                for (var item in options.io.config.invoice) {
                  result[obj][i][item] = data[item];
                }
              }
            }
          }
        }
        return result;
      })
      .then(function(result) {
        result.save(function() {
          options.res.json('success');
        });
      });
  };
}());
