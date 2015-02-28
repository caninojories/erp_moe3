(function() {
  'use strict';

  module.exports = function(options) {
    var document = io[options.name](options.details);
        document.save(function() {
          if (options.done) {options.done(null, document);}
          else {options.res.json('success');}
        });
  };
}());
