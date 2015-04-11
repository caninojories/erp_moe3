(function() {
  'use strict';

  exports._ = function(options) {
    var document = io[options.name](options.details);
      document.save(function() {
        if (options.done) {options.done(null, document);}
        else {options.res.json({message: 'Invoice Registration', status: 200, data: document});}
      });
  };

  exports.User = function(options) {
    var document = io[options.name](options.details);
      document.save(function(err) {
        if (err) {return options.next(err);}
        options.req.message = 'User Login';
        options.req.status  = 200;
        options.req.user    = document;
        options.next();
      });
  };
}());
