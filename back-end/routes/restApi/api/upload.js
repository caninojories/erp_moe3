(function() {
  'use strict';

  var app = io.express();

  app.route('/upload')
    .get(function(req, res, next) {
      require('buffer-concat');
      var Grid = io.gridFS;
      Grid.mongo = io.mongooseGrid.mongo;

      var conn = io.mongooseGrid.createConnection(io.config.dbName);
      conn.once('open', function () {
        var gfs       = new Grid(conn.db);
        var contents  = [];
        var index     = 0;
        var chunks = [];
        var size = 0;


        gfs.files.find({  }).toArray(function (err, files) {
          done(files);
        });

        function done(files) {
            if (index == files.length) {
              return res.json(contents);
            }
            setTimeout(function() {
              size = 0;
              chunks = [];
              var readstream = gfs.createReadStream({
                _id: files[index]._id
              });

              readstream.on('data', function(chunk) {
                size += chunk.length;
                chunks.push(chunk);
              });

              readstream.on('end', function() {
                var data = Buffer.concat(chunks, size);
                contents.push(data.toString('base64'));
                index++;
                done(files);
              });
            }, 1000);
        }
      });
    })
    .post(io.SERVICES().upload);

  module.exports = app;
}());
