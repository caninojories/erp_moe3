(function() {
  'use strict';

  global.appRequire = function(name) {
    return require(__dirname + '/' + name);
  };

  global.global.io = appRequire('services/module.config');

    var catchAll  = require('./routes');

    /* Database Configuration */
    require('./configuration/mongodb'); //mongodb integration

    /* Express Server */
    var app = global.global.io.express();

    /* Configuration Files */
    require('./configuration/express')(app);
    require('./configuration/passport')(global.global.io.passport);

    /* Routes */
    global.io.useApp(app);
    global.io.useApi(app);
    app.use('*', catchAll);

    /* global.io.cluster Configuration */
    if (global.io.cluster.isMaster) {global.io.clusterService(global.io);}
    else {
      app.listen(global.io.port, function() {
      console.log(global.io.chalk.red.reset.underline('listening to port ') +
        global.io.chalk.cyan.bold((global.io.port)));
      });
    }
}());
