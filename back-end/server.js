(function() {
  'use strict';

  global.appRequire = function(name) {
    return require(__dirname + '/' + name);
  };

  global.io = appRequire('services/module.config');

    var catchAll  = require('./routes');

    /* Database Configuration */
    require('./configuration/mongodb'); //mongodb integration

    /* Express Server */
    var app = io.express();

    /* Configuration Files */
    require('./configuration/express')(app);
    require('./configuration/passport')(io.passport);

    /* Routes */
    io.useApp(app);
    io.useApi(app);
    app.use('*', catchAll);

    /* io.cluster Configuration */
    if (io.cluster.isMaster) {io.clusterService(io);}
    else {
      app.listen(global.io.port, function() {
      console.log(io.chalk.red.reset.underline('listening to port ') +
        io.chalk.cyan.bold((io.port)));
      });
    }
}());
