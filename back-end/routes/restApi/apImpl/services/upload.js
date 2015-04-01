(function() {
  'use strict';

  var fs = require('fs');
  var shortId = require('shortid');

  module.exports = function(req, res, next) {
  var Grid = io.gridFS;
  Grid.mongo = io.mongooseGrid.mongo;

  var conn = io.mongooseGrid.createConnection(io.config.dbName);
    conn.once('open', function () {
      var gfs = new Grid(conn.db);
      var is;
      var os;
      //get the extenstion of the file
      var extension = req.files.file.path.split(/[. ]+/).pop();
      is = fs.createReadStream(req.files.file.path);
      os = gfs.createWriteStream({ filename: shortId.generate()+'.'+extension });
      is.pipe(os);

      os.on('close', function (file) {
        fs.unlink(req.files.file.path, function() {
          res.json(200, file);
        });
      });
    });
  };
}());
