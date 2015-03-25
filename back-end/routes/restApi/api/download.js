(function() {
  'use strict';

  var app = io.express();

  app.route('/:file')
    .get(function(req, res, next) {
      res.download(io.rootPath + req.params.file);
      setTimeout(function() {
        io.fse.remove(io.rootPath + req.params.file, function(err) {
          if (err) return console.error(err);
            console.log("success!");
        });
      }, 1000);
    });
  module.exports = app;
}());
