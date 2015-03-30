(function() {
  'use strict';

  global.appRequire = function(name) {
    return require(__dirname + '/' + name);
  };

  global.root = function(name) {
    return io.path.normalize(__dirname + '../../' + name);
  };


  global.io = appRequire('services/module.config');

    var catchAll  = require('./routes');

    /* Database Configuration */
    require('./configuration/mongodb'); //mongodb integration

    /** Express Server **/
    var app = io.express();

    /** Configuration Files **/
    require('./configuration/express')(app);
    require('./configuration/passport')(io.passport);

    /** Routes **/
    app.use(afterResponse);
    io.useApp(app);
    io.useApi(app);
    app.use(function(err, req, res, next) {
      res.status(err.status || 500).send({
        message: err.message,
        status: err.status || 500
      });
    });
    app.use('*', catchAll);

    /*cannot use 404 in server side*/

    /** io.cluster Configuration **/
    if (io.cluster.isMaster) {io.clusterService(io);}
    else {
      app.listen(global.io.port, function() {
        console.log(io.chalk.red.reset.underline('listening to port ') +
        io.chalk.cyan.bold((io.port)));
      });
    }

  function afterResponse(req, res, next) {
    var response = function(db) {
      io.mongoose.connection.close(function (db) {
        console.log('Mongoose connection disconnected upon close');
      });
    };
    var disconnectAsync = function() {
      io.mongoose.disconnectAsync(function() {
        console.log('Mongoose connection disconnected upon disconnect');
        response();
      });
    };
    res.on('finish', disconnectAsync);
    next();
  }
}());
